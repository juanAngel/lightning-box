import { bech32 } from "bech32";
import { createHash, randomBytes } from "crypto";
import querystring from "querystring";

export const hexToUint8Array = (hexString: string) => {
  return new Uint8Array(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
};

export const stringToUint8Array = (str: string) => {
  return Uint8Array.from(str, (x) => x.charCodeAt(0));
};

export const bytesToHexString = (bytes: Buffer | Uint8Array) => {
  // console.log("inside bytesToHexString");
  // console.log(bytes);
  return bytes.reduce(function (memo, i) {
    return memo + ("0" + i.toString(16)).slice(-2); //padd with leading 0 if <16
  }, "");
};

export const generateBytes = (n: number): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    randomBytes(32, function (error, buffer) {
      if (error) {
        reject(error);
        return;
      }
      resolve(buffer);
    });
  });
};

export const generateShortChannelId = (): Promise<number> => {
  // According to https://github.com/lightningnetwork/lightning-rfc/blob/master/01-messaging.md#fundamental-types
  // `short_channel_id` is 8 byte
  return new Promise((resolve, reject) => {
    randomBytes(8, function (error, buffer) {
      if (error) {
        reject(error);
        return;
      }
      resolve(buffer.readUInt32BE());
    });
  });
};

export const timeout = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(void 0), time));

export function sha256(bytes: Uint8Array) {
  return createHash("sha256").update(bytes).digest("hex");
}

export function sha256Buffer(bytes: Uint8Array) {
  return createHash("sha256").update(bytes).digest();
}

export function randomIntegerRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
declare global {
  interface Date {
    addDays(days:number): Date;
  }
}
Date.prototype.addDays = function(days:number) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
export const getExpirationDate = (days:number):Date =>{
  const result = new Date();
  result.setDate(result.getDate()+days);

  return result;
}
