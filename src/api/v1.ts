import { Client } from "@grpc/grpc-js";
import { FastifyPluginAsync } from "fastify";

import {Login} from "./login"
import { PayAddress } from "./pay";
import { Wallet } from "./wallet";
import withdraw from "./withdraw";

export let apiPrefix = "/";

import {Lightning,Router} from "lnd-grpc";

export const V1 = (async (app, { lightning, router,prefix})=>{
    apiPrefix = prefix || "/";

    app.register(Login, {
        lightning,
        router
    });

    app.register(PayAddress, {
        lightning,
        router
    });

    app.register(withdraw, {
        lightning,
        router
    });

    app.register(Wallet, {
        lightning,
        router
    });


}) as FastifyPluginAsync<{ lightning: Lightning; router: Router, prefix?:string }>;
