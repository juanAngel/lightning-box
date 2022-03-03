import { Client } from "@grpc/grpc-js";
import { FastifyPluginAsync } from "fastify";
import { AuthDiscovery } from "./login";
import { PayAddressDiscover } from "./pay";

import {Lightning,Router} from "lnd-grpc";



export const Discovery = (async (app, { lightning, router})=>{


  app.register(PayAddressDiscover, {
    lightning,
    router,
  });

  app.register(AuthDiscovery, {
    lightning,
    router,
  });

}) as FastifyPluginAsync<{ lightning: Lightning; router: Router, prefix?:string }>;