import { Database } from "sqlite";

export interface IWalletDB {
  alias: string;
  pubkey: string;
  amountMSat: number|0;
}

export async function createWallet(db: Database, alias:string, pubkey:string) {
  await db.run(
    `INSERT INTO wallet
      (alias, pubkey, amountMSat)
    VALUES
      ($alias, $pubkey, 0)
    `,
    {
      $alias: alias,
      $pubkey: pubkey,
    },
  );
}
export const updateWalletBalance = async (db: Database,alias:string,diffMSat:number)=>{
  return db.get<IWalletDB[]>(`UPDATE wallet 
                              SET amountMSat = amountMSat+$diffMSat 
                              WHERE alias = $alias`, {
    $alias: alias,
    $diffMSat:diffMSat
  });
}

export function getWalletsByPubkey(db: Database, pubkey: string) {
  return db.get<IWalletDB[]>(`SELECT * FROM wallet WHERE pubkey = $pubkey`, {
    $pubkey: pubkey,
  });
}
export function getWalletByAlias(db: Database, alias: string) {
  return db.get<IWalletDB>(`SELECT * FROM wallet WHERE alias = $alias`, {
    $alias: alias,
  });
}
