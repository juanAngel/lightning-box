import { Database } from "sqlite"

export interface IAuthSecretDB{
    k1:string;
    expirationDate:Date;
}

export const createAuthSecret = async (db: Database,k1:string,expirationDate:Date) =>{
    await db.run(
        `INSERT INTO authSecret
          (k1, expirationDate)
        VALUES
          ($k1, $expirationDate)
        `,
        {
          $k1: k1,
          $expirationDate: expirationDate
        },
      );
}

export const getAuthSecret = async (db: Database, k1:string) => {
  let result = await db.all<IAuthSecretDB[]>(`SELECT * FROM authSecret WHERE k1 = $k1`, {
    $k1: k1,
  });
  return result? result[0]:undefined;
}

export const deleteAuthSecret = async (db: Database, k1:string) => {
  await db.all<IAuthSecretDB[]>(`DELETE FROM authSecret WHERE k1 = $k1`, {
    $k1: k1,
  });
}