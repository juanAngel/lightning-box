import sqlite3 from "sqlite3";
import { Pool } from 'pg';
import { Database, open } from "sqlite";
import config from "../../config/config";

let db: Database | null = null;
export async function getConnection(uri:string) {
  let [dbType,dbURI] = uri.split("://");
  let dbVar = {} as {[key:string]:string};

  dbURI.split(";").forEach(it => {
    let [key, value] = it.split("=");

    dbVar[key] = value;
  });;

  if(dbType == "sqlite" && dbVar["source"]){
    return dbVar["source"];
  }
  return "";
}

export default async function getDb(forceReopen: boolean = false) {
  if (db && !forceReopen) {
    return db;
  }

  db = await open({
    filename: await getConnection(config.dbUrl),
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
  });
  await db.migrate();

  if (config.env === "development") {
    sqlite3.verbose();
  }

  return db;
}

export async function beginTransaction(db: Database) {
  await db.run("BEGIN TRANSACTION");
  return;
}

export async function commit(db: Database) {
  await db.run("COMMIT");
  return;
}
