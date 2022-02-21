import { Database } from "sqlite";

export interface IAuthenticationDB {
  userAlias: string;
  pubeky: string;
}

export interface IPaymentDB {
  paymentRequest: string;
  userAlias: string;
  amountSat: number;
  settled: number;
  comment: string | null;
}

export async function createPayment(
  db: Database,
  {
    paymentRequest,
    userAlias,
    amountSat,
    settled,
    comment,
  }: IPaymentDB,
) {
  await db.run(
    `INSERT INTO payment
      (
        paymentRequest,
        userAlias,
        amountSat,
        settled,
        comment
      )
    VALUES
      (
        $paymentRequest,
        $userAlias,
        $amountSat,
        $settled,
        $comment
      )
    `,
    {
      $paymentRequest: paymentRequest,
      $userAlias: userAlias,
      $amountSat: amountSat,
      $settled: settled,
      $comment: comment,
    },
  );
}

/**
 * Note: Updating paymentRequest, userAlias and comment is not allowed
 */
export async function updatePayment(
  db: Database,
  { paymentRequest, settled }: IPaymentDB,
) {
  await db.run(
    `UPDATE payment
    SET settled = $settled
    WHERE paymentRequest = $paymentRequest`,
    {
      $settled: settled,
      $paymentRequest: paymentRequest,
    },
  );
}

export function getPayment(db: Database, paymentRequest: string) {
  return db.get<IPaymentDB>(`SELECT * FROM payment WHERE paymentRequest = $paymentRequest`, {
    $paymentRequest: paymentRequest,
  });
}

export function getNonForwardedPayments(db: Database, userAlias: string) {
  return db.all<IPaymentDB[]>(
    `SELECT * FROM payment WHERE userAlias = $userAlias AND settled = 1 AND forwarded = 0`,
    {
      $userAlias: userAlias,
    },
  );
}

// TODO not sure about race conditions with this one...
export async function updatePaymentsSetAsForwarded(
  db: Database,
  userAlias: string,
  paymentRequestForward: string,
) {
  await db.run(
    `UPDATE payment
    SET paymentRequestForward = $paymentRequestForward, forwarded = 1
    WHERE userAlias = $userAlias AND settled = 1 AND forwarded = 0`,
    {
      $paymentRequestForward: paymentRequestForward,
      $userAlias: userAlias,
    },
  );
}
