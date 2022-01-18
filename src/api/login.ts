import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { Client } from "@grpc/grpc-js";
import crypto from "crypto";

import getDb from "../db/db";
import config from "../../config/config";
import {
  createLnUrlAuth, 
  IErrorResponse, 
  IStatusResponse, 
  LnUrlAuthQuery, 
  verifyLnurlAuth
} from "../utils/lnurl"
import {randomBytes} from "crypto";
import { bytesToHexString, generateBytes, hexToUint8Array } from "../utils/common";
import { createAuthSecret, deleteAuthSecret, getAuthSecret } from "../db/auth";
import { Database } from "sqlite";
import { apiPrefix } from "./v1";
import { FastifyRequest } from "fastify";


export interface IJWTPayload{
  key:string;
}
export interface ILoginResponse{
  tag: "loginRequest";
  lnurlAuth:string;
  expirationDate:Date;
}
export interface ILoginSucessResponse extends IStatusResponse{
  event: 'JWT';
  token: string;
}

export const jwtDecode = (app:FastifyInstance,request:FastifyRequest):IJWTPayload =>{
  const [type, token] = (request.headers.authorization||"").split(" ");
  
  return app.jwt.decode(token) as IJWTPayload;
}
export const jwtVerify = (async (request,response)=>{
  try {
    await request.jwtVerify();
  } catch (error:any) {
    response.send(error);
  }
}) as RouteHandlerMethod;

const createLnUrlAuthResponse = async (db:Database,prefix:string):Promise<ILoginResponse>=>{

  const k1 = bytesToHexString(await generateBytes(32));
  let expirationDate = new Date().addDays(1);

  await createAuthSecret(db,k1,expirationDate);
  const lnurlAuth = createLnUrlAuth(k1,`${config.domainUrl}${apiPrefix}/lnurl-auth/`);

  return {
    tag:"loginRequest",
    lnurlAuth:lnurlAuth,
    expirationDate:expirationDate
  }
}
export const AuthDiscovery = (async (app, { lightning, router})=>{
  const db = await getDb();

  app.get<{
      Querystring: LnUrlAuthQuery;
    }>("/keyauth/login-ws/", async (request, response):Promise<IStatusResponse> =>{

      return {
        status:"OK"
      };
  })
  app.get<{
    }>("/keyauth/login/", async (request, response):Promise<ILoginResponse> =>{

      return await createLnUrlAuthResponse(db,apiPrefix);
  })
  
}) as FastifyPluginAsync<{ lightning: Client; router: Client, prefix?:string }>;

export const Login = (async (app, { lightning, router})=>{
    const db = await getDb();

    /*
    app.decorate("authenticate", (async (request, response)=>{
      try {
          await request.jwtVerify()
      } catch (err) {
          response.send(err)
      }
    })as RouteHandlerMethod)*/

    app.get<{
        Querystring: LnUrlAuthQuery;
      }>("/lnurl-auth-ws/", async (request, response) =>{

    })
    app.get<{
        Querystring: LnUrlAuthQuery;
      }>("/lnurl-auth/", async (request, response):Promise<ILoginSucessResponse|IErrorResponse> =>{
        const sig = request.query.sig;
        const key = request.query.key;
        const k1 = request.query.k1;
        if(!key && !sig && !k1){
            response.code(400);
            return {
                status: "ERROR",
                reason: `Missing required parameter`,
            };
        }
        let authSecret = await getAuthSecret(db,k1);
        if(authSecret && authSecret.expirationDate<new Date()){
          await deleteAuthSecret(db,k1);
          response.code(401);
          const error: IErrorResponse = {
            status: "ERROR",
            reason:
              "k1 expired",
          };
          return error;
        }

        // Verify that the message is valid
        if (!verifyLnurlAuth(sig,key,k1)) {
          response.code(401);
          const error: IErrorResponse = {
            status: "ERROR",
            reason:
              "The Public key provided doesn't match with the public key extracted from the signature.",
          };
          return error;
        }

        deleteAuthSecret(db,k1);
        const accessToken = app.jwt.sign(
          { key } as IJWTPayload,
          {
            expiresIn: "1d"
          }
        );

        return {
          status:"OK",
          event:"JWT",
          token:accessToken
        }
    })
}) as FastifyPluginAsync<{ lightning: Client; router: Client, prefix?:string }>;