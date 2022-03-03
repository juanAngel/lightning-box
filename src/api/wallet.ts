import { FastifyPluginAsync } from "fastify";
import { Client } from "@grpc/grpc-js";
import crypto from "crypto";

import { createWithdrawalCode,getWithdrawalCode } from "../db/withdrawalCode";
import getDb, { beginTransaction, commit } from "../db/db";
import config from "../../config/config";
import { compareDesc } from "date-fns";
import {randomBytes} from "crypto";
import { createDrainRequest, createLightningAdress, IErrorResponse } from "../utils/lnurl";
import { jwtDecode, jwtVerify } from "./login";
import { apiPrefix } from "./v1";
import { createWallet, getWalletByAlias, getWalletsByPubkey } from "../db/wallet";


import {Lightning,Router} from "lnd-grpc";

export interface IWalletRegisterResponse{
    tag: "walletRegisterRequest";
    lightningAddress:string;
    drainRequest:string;
}
export interface IWalletResponse{
    tag: "walletRequest";
    alias:string[];
}
const createWalletRegisterResponse = async (username:string,code:string):Promise<IWalletRegisterResponse>=>{
    return {
        tag: "walletRegisterRequest",
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
        {
          preValidation: jwtVerify
        },
        async (request, response):Promise<IWalletResponse>=>{
            const {key} = jwtDecode(app,request);

            const wallet = await getWalletsByPubkey(db,key);
            let alias:string[] =[];
            if(wallet){
                alias = wallet?.map((value)=>value.alias);
            }

            return {
                tag:"walletRequest",
                alias:alias
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
                    code:400,
                    reason: `The recipient ${username}@${config.domain} already in use.`,
                };
            }
            let code = "";
            //Obtiene un nuevo codigo aleatorio unico
            do{
                code = randomBytes(32).toString('hex');
            }while(await getWithdrawalCode(db, code));

            
            await beginTransaction(db);
            await createWallet(db,username,key);
            await createWithdrawalCode(db,{code:code,userAlias:username});
            await commit(db);

            response.code(200);
            return createWalletRegisterResponse(username,code);

          } catch (error:any) {
              console.error(error);
              response.code(500);
              return {
                  status:"ERROR",
                  code:400,
                  reason: "internal errores"
              }
          }
    });
} as FastifyPluginAsync<{ lightning: Lightning; router: Router }>;
