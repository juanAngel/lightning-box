import { URL, URLSearchParams } from "url";
import { bech32 } from "bech32";
import { stringToUint8Array, hexToUint8Array } from "./common";
import secp256k1 from "secp256k1";
import config from "../../config/config";


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
export interface ILnUrlPayQuerystring {
  amount: string;
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
export interface IEvent extends IStatusResponse{
    tag: "event"
}

export interface IErrorResponse {
    status: "ERROR";
    code:number;
    reason: string;
}

export const verifyLnurlAuth = (sig:string,key:string,k1:string):boolean=>{
    const valid = secp256k1.ecdsaVerify(
        secp256k1.signatureImport(hexToUint8Array(sig)),
        hexToUint8Array (k1),
        hexToUint8Array(key),
    );
    return valid;
}

export const createLnUrlAuth = (k1: string, url: string) => {
    let lnUrl = new URL(url);
    lnUrl.searchParams.append("tag","login");
    lnUrl.searchParams.append("k1",k1);
    lnUrl.protocol = "keyauth";
    let urlString = lnUrl.toString()

    console.log("lnurl: "+urlString);

    let result = undefined;
    if(config.bech32Encode){
      result = bech32.encode("lnurl", bech32.toWords(stringToUint8Array(urlString)), 1024);
    }else{
      result = urlString.replace(/https?/,"keyauth")
    }


    return result;
}

type Metadata = [string, string][];

export function constructLnUrlPayMetaData(username: string, domain: string): Metadata {
  const LA = createLightningAdress(username,domain);
  return [
    ["text/plain", `Payment to ${LA}`],
    ["text/identifier", `${LA}`],
  ];
}

export const createLightningAdress= (username:string,domain:string)=>{
  return `${username}@${domain}`;
}
export const createDrainRequest = (domainUrl:string,apiPrefix:string,code:string)=>{
  return `${domainUrl}${apiPrefix}/withdraw/${code}`.replace(/https?/,"lnurlw");
}

export function parseSendTextCallbackQueryParams(params: ILnUrlPayQuerystring): ILnUrlPayQuery {
  try {
    return {
      amount: Number.parseInt((params.amount+"") ?? "0", 10),
      comment: params.comment ?? "",
    };
  } catch (e) {
    console.error(e);
    throw new Error("Could not parse query params");
  }
}