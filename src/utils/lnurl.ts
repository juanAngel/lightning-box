import { URLSearchParams } from "url";
import { bech32 } from "bech32";
import { createHash, randomBytes } from "crypto";
import { stringToUint8Array } from "./common";


export interface LnUrlAuthQuery {
    k1: string;
    sig: string;
    key: string;
    action?:string;
    tag?:string;
}

export interface ILnUrlPayQuery {
  amount: number;
  comment?: string;
}

export interface ILnUrlWithdrawRequest {
    tag: "withdrawRequest";
    callback: string;
    k1: string;
    defaultDescription: string;
    minWithdrawable: number;
    maxWithdrawable: number;
    balanceCheck: string;
    payLink:string;
    currentBalance?: number;
}
  
export interface ILnUrlWithdrawQuery {
    k1: string;
    pr: string;
}

export interface IStatusResponse{
    status: "OK"
}

export interface IErrorResponse {
    status: "ERROR";
    reason: string;
}

const verifyLnurlAuth = ()=>{

}

export function createLnUrlAuth(k1: string, url: string) {
    const params = new URLSearchParams({
      tag: "login",
      k1:k1,
    }).toString();
    return bech32.encode("lnurl", bech32.toWords(stringToUint8Array(url + "?" + params)), 1024);
}