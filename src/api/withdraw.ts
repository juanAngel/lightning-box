import { FastifyPluginAsync } from "fastify";
import { Client } from "@grpc/grpc-js";
import {Mutex, MutexInterface} from "async-mutex";

import { bytesToHexString, generateBytes } from "../utils/common";
import {
  getNonForwardedPayments,
  getPayment,
  updatePayment,
  updatePaymentsSetAsForwarded,
} from "../db/payment";
import { sendPaymentSync, subscribeInvoices } from "../utils/lnd-api";
import { MSAT } from "../utils/constants";
import getDb from "../db/db";
import { getWithdrawalCode } from "../db/withdrawalCode";
import config from "../../config/config";
import { lnrpc } from "../proto";
import { 
  IErrorResponse, 
  ILnUrlWithdrawQuery, 
  ILnUrlWithdrawRequest, 
  IStatusResponse 
} from "../utils/lnurl";


import {decode as invoiceDecode} from "@node-lightning/invoice";
import { getWalletByAlias, updateWalletBalance } from "../db/wallet";

const Withdraw = async function (app, { lightning, router }) {
  try {
    const db = await getDb();
    const withdrawalRequests = new Map<string, string>();
    const withdrawalMutex = new Map<string, Mutex>();

    const invoiceSubscription = subscribeInvoices(lightning);
    invoiceSubscription.on("data", async (data) => {
      console.log("\nINCOMING INVOICE");
      const invoice = lnrpc.Invoice.decode(data);
      if (invoice.settled) {
        console.log("Settled");

        // Check if this invoice relates to Lighting Box
        const payment = await getPayment(db, invoice.paymentRequest);
        if (payment) {
          console.log("Related payment");

          await updateWalletBalance(
            db,payment.userAlias,
            invoice.amtPaid.toNumber()
          );
          await updatePayment(db, {
            paymentRequest: payment.paymentRequest,
            userAlias: payment.userAlias,
            amountSat: invoice.amtPaid.toNumber(),
            settled: +invoice.settled,
            comment: payment.comment,
          });
        }
      }
    });

    app.get<{
      Params: { code: string };
      Querystring: { balanceCheck: string };
    }>("/withdraw/:code", async (request, response):Promise<ILnUrlWithdrawRequest|IErrorResponse> => {
      console.log("withdraw/:code");
      const code = request.params.code;
      const { balanceCheck } = request.query;

      const withdrawalCode = await getWithdrawalCode(db, code);
      if (!withdrawalCode) {
        response.code(400);
        return {
          status: "ERROR",
          code:400,
          reason: "Invalid withdrawal code.",
        };
      }

      //const payments = await getNonForwardedPayments(db, withdrawalCode.userAlias);
      const totalWithdrawalSat = (await getWalletByAlias(db,withdrawalCode.userAlias))?.amountMSat;

      if (!totalWithdrawalSat || totalWithdrawalSat <= 0) {
        response.code(400);
        return {
          status: "ERROR",
          code:400,
          reason: "No funds available.",
        };
      }

      const k1 = bytesToHexString(await generateBytes(32));
      withdrawalRequests.set(k1, code);

      const withdrawRequest: ILnUrlWithdrawRequest = {
        tag: "withdrawRequest",
        callback: `${config.domainUrl}/withdraw/callback`,
        defaultDescription: `Withdraw Lightning Box for ${withdrawalCode.userAlias}@${config.domain}`,
        k1,
        minWithdrawable: totalWithdrawalSat * MSAT,
        maxWithdrawable: totalWithdrawalSat * MSAT,
        balanceCheck: `${config.domainUrl}/withdraw/${code}?balanceCheck`,
        payLink: `${config.domainUrl}/.well-known/lnurlp/${withdrawalCode.userAlias}`,
      };
      if (balanceCheck) {
        withdrawRequest.currentBalance = totalWithdrawalSat;
      }

      return withdrawRequest;
    });

    app.get<{
      Params: { code: string };
      Querystring: ILnUrlWithdrawQuery;
    }>("/withdraw/callback", async (request, response):Promise<IStatusResponse|IErrorResponse> => {
      const code = request.params.code;
      const withdrawResponse = request.query;

      const userAlias = withdrawalRequests.get(withdrawResponse.k1);
      if (!userAlias) {
        response.code(400);
        return {
          status: "ERROR",
          code:400,
          reason: "Invalid request.",
        };
      }

      if (!withdrawResponse.pr) {
        response.code(400);
        return {
          status: "ERROR",
          code:400,
          reason: "Missing parameter pr.",
        };
      }

      response.send({
        status: "OK",
      });
      //TODO: userAlias mutex
      let lock = withdrawalMutex.get(userAlias);
      if(lock === undefined){
        lock = new Mutex;
        withdrawalMutex.set(userAlias,lock)
      }
      let release:MutexInterface.Releaser|undefined = undefined;
      const invoice = invoiceDecode(withdrawResponse.pr);
      const invoiceAmount = Number.parseInt(invoice.valueMsat);

      try {
        release = await lock.acquire();
        let amount = (await getWalletByAlias(db,userAlias))?.amountMSat;

        if(amount && amount >= invoiceAmount){
          const result = await sendPaymentSync(lightning, withdrawResponse.pr);
          console.log(result);
          if (!result.paymentError || result.paymentError.length === 0) {
            await updateWalletBalance(db,userAlias,Number.parseInt(invoice.valueMsat)*-1);
          }
        }else{
          console.log(`insufficient balance for the wallet ${userAlias}`);
        }
        withdrawalRequests.delete(withdrawResponse.k1);


      } finally {
        if(release !== undefined)
          release();
        if(!lock.isLocked()){
          withdrawalMutex.delete(userAlias);
        }
      }

      return {
        status:"OK"
      }
    });
  } catch (error) {
      console.error(error);
  }
} as FastifyPluginAsync<{ lightning: Client; router: Client }>;

export default Withdraw;

