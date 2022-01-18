import { Database } from "sqlite";

export interface IWalletDB {
  alias: string;
  pubkey: string;
}

export async function createWallet(db: Database, { alias, pubkey }: IWalletDB) {
  await db.run(
    `INSERT INTO wallet
      (alias, pubkey)
    VALUES
      ($alias, $pubkey)
    `,
    {
      $alias: alias,
      $pubkey: pubkey,
    },
  );
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
