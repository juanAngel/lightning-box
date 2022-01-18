import { FastifyPluginAsync } from "fastify";
import { Client } from "@grpc/grpc-js";
import crypto from "crypto";

import { createWithdrawalCode,getWithdrawalCode } from "../db/withdrawalCode";
import getDb, { beginTransaction, commit } from "../db/db";
import config from "../../config/config";
import { compareDesc } from "date-fns";
import {randomBytes} from "crypto";
import { createDrainRequest, createLightningAdress, IErrorResponse } from "../utils/lnurl";
import { IJWTPayload, jwtDecode, jwtVerify } from "./login";
import { apiPrefix } from "./v1";
import { createWallet, getWalletByAlias, getWalletsByPubkey } from "db/wallet";

export interface IWalletRegisterResponse{
    tag: "walletRequest";
    lightningAddress:string;
    drainRequest:string;
}
const createWalletRegisterResponse = async (username:string,code:string):Promise<IWalletRegisterResponse>=>{
    return {
        tag: "walletRequest",
        lightningAddress: createLightningAdress(username,config.domain),
        drainRequest:createDrainRequest(config.domainUrl,apiPrefix,code)
    };
}

export const Wallet = async function (app, { lightning, router }){
    const db = await getDb();

    app.get<{
        Params: {
          pubkey:string;
        };
      }>(
        "/wallet/",
        async (request, response)=>{
            const {key} = jwtDecode(app,request);

            const wallet = await getWalletsByPubkey(db,key);

            return {
                status: "OK"
            }
        }
    )
    app.post<{
        Params: {
          username: string;
          pubkey:string;
        };
      }>(
      "/wallet/:username/add/",
      {
        preValidation: jwtVerify
      },
      async (request, response):Promise<IWalletRegisterResponse|IErrorResponse> =>{

          //const {key} = request.headers.authorization;
          const username = request.params.username;
          const {key} = jwtDecode(app,request);
          
          const user = await getWalletByAlias(db, username);
          console.log(`user: ${username} pubkey: ${JSON.stringify(key)}`);

          try {
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
                code = randomBytes(32).toString('hex');
            }while(await getWithdrawalCode(db, code));

            
            await beginTransaction(db);
            await createWallet(db,{alias:username,pubkey:key});
            await createWithdrawalCode(db,{code:code,userAlias:username});
            await commit(db);

            response.code(200);
            return createWalletRegisterResponse(username,code);

          } catch (error:any) {
              console.error(error);
              response.code(500);
              return {
                  status:"ERROR",
                  reason: "internal errores"
              }
          }
    });
} as FastifyPluginAsync<{ lightning: Client; router: Client }>;