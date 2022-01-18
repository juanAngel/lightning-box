import { FastifyPluginAsync } from "fastify";
import { Client } from "@grpc/grpc-js";
import crypto from "crypto";

import { addInvoice } from "../utils/lnd-api";
import { createPayment } from "../db/payment";
import { getWalletByAlias } from "../db/wallet";
import { MSAT } from "../utils/constants";
import getDb from "../db/db";
import config from "../../config/config";
import { constructLnUrlPayMetaData, 
  ILnUrlPayQuerystring, 
  parseSendTextCallbackQueryParams 
} from "../utils/lnurl";

export const PayAddressDiscover = async function (app, { lightning, router }) {
  const db = await getDb();

  app.get<{
    Params: {
      username: string;
    };
  }>("/lnurlp/:username/", async (request, response) => {
    const username = request.params.username;
    const wallet = await getWalletByAlias(db, username);
    if (!wallet) {
      response.code(404);
      return {
        status: "ERROR",
        reason: `The recipient ${username}@${config.domain} does not exist.`,
      };
    }

    return {
      tag: "payRequest",
      callback: `${config.domainUrl}/lightning-address/${username}/send`,
      minSendable: 1 * MSAT,
      maxSendable: 1000000 * MSAT,
      metadata: JSON.stringify(constructLnUrlPayMetaData(username, config.domain)),
      commentAllowed: 144,
    };
  });
} as FastifyPluginAsync<{ lightning: Client; router: Client, prefix?:string }>

export const PayAddress = async function (app, { lightning, router }) {
  const db = await getDb();

  app.get<{
    Params: {
      username: string;
    };
    Querystring: ILnUrlPayQuerystring;
  }>("/lightning-address/:username/send/", async (request, response) => {
    try {
      const username = request.params.username;
      const wallet = await getWalletByAlias(db, username);
      if (!wallet) {
        response.code(400);
        return {
          status: "ERROR",
          reason: `The recipient ${username} does not exist.`,
        };
      }

      const { amount, comment } = parseSendTextCallbackQueryParams(request.query);

      if (comment && comment.length > 144) {
        console.error("Got invalid comment length");
        response.code(400);
        return {
          status: "ERROR",
          reason: "Comment cannot be larger than 144 letters.",
        };
      }

      // TODO check amount

      const invoice = await addInvoice(
        lightning,
        amount,
        crypto
          .createHash("sha256")
          .update(JSON.stringify(constructLnUrlPayMetaData(username, config.domain)))
          .digest(),
      );

      await createPayment(db, {
        paymentRequest: invoice.paymentRequest,
        paymentRequestForward: null,
        userAlias: username,
        amountSat: amount / MSAT,
        forwarded: 0,
        settled: 0,
        comment: comment ?? null,
      });

      return {
        pr: invoice.paymentRequest,
        successAction: null,
        disposable: true,
      };
    } catch (error:any) {
      response.code(500);
      return {
        status: "ERROR",
        reason: error.message,
      };
    }
  });
} as FastifyPluginAsync<{ lightning: Client; router: Client, prefix?:string }>;

