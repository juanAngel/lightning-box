import { FastifyPluginAsync } from "fastify";
import { Client } from "@grpc/grpc-js";
import crypto from "crypto";

import { addInvoice } from "../utils/lnd-api";
import { createPayment } from "../db/payment";
import { getUserByAlias,createUser } from "../db/user";
import { createWithdrawalCode,getWithdrawalCode } from "../db/withdrawalCode";
import getDb from "../db/db";
import config from "../../config/config";
import { compareDesc } from "date-fns";
import {randomBytes} from "crypto";


const Wallet = async function (app, { lightning, router }){
    const db = await getDb();

    app.post<{
        Params: {
          username: string;
          pubkey:string;
        };
      }>("/wallet/:username/:pubkey/add", async (request, response) =>{

        const username = request.params.username;
        const pubkey = request.params.pubkey;
        const user = await getUserByAlias(db, username);

        if(user){
            response.code(400);
            return {
                status: "ERROR",
                reason: `The recipient ${username}@${config.domain} already in use.`,
            };
        }
        let code = "";
        //Obtiene un nuevo codigo aleatorio unico
        do{
            code = randomBytes(64).toString('hex');
        }while(!await getWithdrawalCode(db, code));

        await createUser(db,{alias:username,pubkey:pubkey});
        await createWithdrawalCode(db,{code:"",userAlias:username});

        return {
            tag: "userRequest",
            lightningAddress: `${username}@${config.domain}`,
            drainRequest:''
        };
    });
} as FastifyPluginAsync<{ lightning: Client; router: Client }>;

export default Wallet;