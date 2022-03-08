import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { Client } from "@grpc/grpc-js";
import crypto from "crypto";

import getDb from "../db/db";
import config from "../../config/config";
import {
  createLnUrlAuth, 
  IErrorResponse, 
  IEvent, 
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
import { SocketStream } from "fastify-websocket";
import { FastifyReply } from "fastify";


import {Lightning,Router} from "lnd-grpc";

export interface ICommand{
  cmdName:string
  arg:{[key:string]:any}[]
}
export interface IJWTPayload{
  key:string;
}
export interface ILoginRequest extends IStatusResponse{
  tag: "loginRequest";
  lnurlAuth:string;
  expirationDate:Date;
}
export interface ILoginSucessResponse extends IEvent{
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

let lnurlAuth = async (key:string, sig:string, k1:string,app:FastifyInstance):Promise<ILoginSucessResponse|IErrorResponse> =>{
  const db = await getDb();

  if(key == undefined || sig == undefined || k1 == undefined){
    return {
        status: "ERROR",
        code: 400,
        reason: `Missing required parameter`,
    };
  }
  let authSecret = await getAuthSecret(db,k1);
  if(authSecret && authSecret.expirationDate<new Date()){
    await deleteAuthSecret(db,k1);
    const error: IErrorResponse = {
      status: "ERROR",
      code:401,
      reason:
        "k1 expired",
    };
    return error;
  }

  // Verify that the message is valid
  if (!verifyLnurlAuth(sig,key,k1)) {
    const error: IErrorResponse = {
      status: "ERROR",
      code:401,
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
    tag:"event",
    event:"JWT",
    token:accessToken
  }
}
export class CommandGetKeyauth{
  
  static cmdName: string = "keyauth";
  static loginSession:Map<string,(accessToken: string)=>void> = new Map()

  static handler = async (connection:SocketStream,command:ICommand):Promise<void> =>{
    const db = await getDb();

    const k1 = bytesToHexString(await generateBytes(32));
    let expirationDate = new Date().addDays(1);
  
    await createAuthSecret(db,k1,expirationDate);
    const lnurlAuth = createLnUrlAuth(k1,`${config.domainUrl}${apiPrefix}/lnurl-auth-ws/`);
  
    let result = {
      status:"OK",
      tag:"loginRequest",
      lnurlAuth:lnurlAuth,
      expirationDate:expirationDate,
    }
    connection.socket.send(JSON.stringify(result))

    CommandGetKeyauth.loginSession.set(k1,(accessToken)=>{
      
      CommandGetKeyauth.loginSession.delete(k1)
      connection.socket.send(JSON.stringify({
          status:"OK",
          tag:"event",
          event:"JWT",
          token:accessToken
      }))
    })
  }
}


let webSochetCommand:{[key:string]:(connection:SocketStream,command:ICommand)=>Promise<void>} = {
  [CommandGetKeyauth.cmdName]:CommandGetKeyauth.handler
}

const createLnUrlAuthRequest = async (db:Database,prefix:string):Promise<ILoginRequest>=>{

  const k1 = bytesToHexString(await generateBytes(32));
  let expirationDate = new Date().addDays(1);

  await createAuthSecret(db,k1,expirationDate);
  const lnurlAuth = createLnUrlAuth(k1,`${config.domainUrl}${apiPrefix}/lnurl-auth/`);

  return {
    status: "OK",
    tag:"loginRequest",
    lnurlAuth:lnurlAuth,
    expirationDate:expirationDate,
  }
}
export const AuthDiscovery = (async (app, { lightning, router})=>{
  try {
    const db = await getDb();

    app.get<{
        Querystring: LnUrlAuthQuery;
      }>("/keyauth/login-ws/",{ websocket: true }, async (connection, response):Promise<any> =>{
        connection.socket.onmessage = (e) => {
          let cmd:ICommand = JSON.parse(e.data.toString());
          
          let handler = webSochetCommand[cmd.cmdName];
          if(handler)
            handler(connection,cmd);

        }
        /*
        return {
          status:"OK"
        };*/
    })
    app.get<{
      }>("/keyauth/login/", async (request, response):Promise<ILoginRequest> =>{

        return await createLnUrlAuthRequest(db,apiPrefix);
    })
  } catch (error) {
    console.error(error);
  }
  
}) as FastifyPluginAsync<{ lightning: Lightning; router: Router, prefix?:string }>;

export const Login = (async (app, { lightning, router})=>{
    try {
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
        }>("/lnurl-auth-ws/", async (request , response) =>{
          const sig = request.query.sig;
          const key = request.query.key;
          const k1 = request.query.k1;

          let result = await lnurlAuth(key,sig,k1,app);
          if(result.status == "ERROR"){
            response.code(result.code);
          }else{
            let cb = CommandGetKeyauth.loginSession.get(k1);
            if(cb){
              cb(result.token);
              CommandGetKeyauth.loginSession.delete(k1);
            }
          }

          return result;
      })
      app.get<{
          Querystring: LnUrlAuthQuery;
        }>("/lnurl-auth/", async (request, response):Promise<ILoginSucessResponse|IErrorResponse> =>{
          const sig = request.query.sig;
          const key = request.query.key;
          const k1 = request.query.k1;

          let result = await lnurlAuth(key,sig,k1,app);
          if(result.status == "ERROR"){
            response.code(result.code);
          }

          return result;
          
      })
    } catch (error) {
      console.error(error);
    }
    
}) as FastifyPluginAsync<{ lightning: Lightning; router: Router, prefix?:string }>;