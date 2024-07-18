import { ICustomer } from "./Customer";
import { ITransaction } from "./Transaction";

export interface ICombinedData {
    customers: ICustomer[];
    transactions: ITransaction[];
  }
  