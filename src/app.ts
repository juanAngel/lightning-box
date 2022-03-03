import fastify, { FastifyServerOptions } from "fastify";
import fastifyCors from "fastify-cors";

//import { getInfo } from "./utils/lnd-api";
//import { getGrpcClients } from "./utils/grpc";

import LndGrpc, { LndGrpcOptions } from "lnd-grpc";

import fastifyJwt from "fastify-jwt";
import { bytesToHexString, generateBytes } from "./utils/common";
import { V1 } from "./api/v1";
import { Discovery } from "./api/discovery";
import websocket from "fastify-websocket";
import config from "../config/config";

//const { lightning, router } = getGrpcClients();

export default async function (options?: FastifyServerOptions) {
  const app = fastify(options);
  app.register(fastifyCors);
  
  app.register(fastifyJwt, { 
    secret: bytesToHexString(await generateBytes(20))
  });
  app.register(websocket)

  
  let grpcOptions:LndGrpcOptions|undefined = undefined;
  const backendConf = config.backendConfigLnd;

  if(backendConf?.lndconnectUri){
    grpcOptions = {
      lndconnectUri:backendConf.lndconnectUri
    };
  }else{
    grpcOptions = {
      host:backendConf?.grpcServer,
      macaroon:backendConf?.adminMacaroon,
      cert:backendConf?.cert
    };
  }
  
  const grpc = new LndGrpc(grpcOptions);
  await grpc.connect();

  const {Lightning,Router} = grpc.services;


  app.register(V1,{
    lightning:Lightning,
    router:Router,
    prefix:"/api/v1"
  });

  app.register(Discovery, {
    lightning:Lightning,
    router:Router,
    prefix:"/.well-known/"
  });

  app.get("/getInfo", async function () {
    return await Lightning.getInfo();
  });

  return app;
}
