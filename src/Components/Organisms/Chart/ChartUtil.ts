/** @format */

import { ITransaction } from "../../../modal/Transaction";

export const filterTransactionsByCustomer = (
  transactions: ITransaction[],
  customerId: number
): ITransaction[] => {
  return transactions.filter(
    (transaction) => transaction.customer_id === customerId
  );
};

export const getTransactionAmounts = (
  transactions: ITransaction[]
): number[] => {
  return transactions.map((transaction) => transaction.amount);
};

export const getTransactionDates = (transactions: ITransaction[]): number[] => {
    return transactions.map((transaction) => new Date(transaction.date).getTime());
  };
  