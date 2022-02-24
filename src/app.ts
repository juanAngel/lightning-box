import fastify, { FastifyServerOptions } from "fastify";
import fastifyCors from "fastify-cors";

import { getInfo } from "./utils/lnd-api";
import { getGrpcClients } from "./utils/grpc";

import fastifyJwt from "fastify-jwt";
import { bytesToHexString, generateBytes } from "./utils/common";
import { V1 } from "./api/v1";
import { Discovery } from "./api/discovery";
import websocket from "fastify-websocket";

const { lightning, router } = getGrpcClients();

export default async function (options?: FastifyServerOptions) {
  const app = fastify(options);
  app.register(fastifyCors);
  
  app.register(fastifyJwt, { 
    secret: bytesToHexString(await generateBytes(20))
  });
  app.register(websocket)

  app.register(V1,{
    lightning,
    router,
    prefix:"/api/v1"
  });

  app.register(Discovery, {
    lightning,
    router,
    prefix:"/.well-known/"
  });

  app.get("/getInfo", async function () {
    return await getInfo(lightning);
  });

  return app;
}
