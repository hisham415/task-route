/** @format */

import React from "react";
import { ICombinedData } from "../../../modal/CombinedData";
import "./CustomerTransactionsTable.styles.css";

interface CustomerTransactionsTableProps {
  combinedData: ICombinedData;
}

const CustomerTransactionsTable: React.FC<CustomerTransactionsTableProps> = ({ combinedData }) => {
  const customerDataWithTransactions = combinedData.customers.map(customer => ({
    customer,
    transactions: combinedData.transactions.filter(transaction => transaction.customer_id === customer.id),
  }));

  return (
    <div className="table-wrapper">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {customerDataWithTransactions.map(({ customer, transactions }) => (
            <React.Fragment key={`customer-${customer.id}`}>
              <tr>
                <td rowSpan={transactions.length + 1}>{customer.name}</td>
              </tr>
              {transactions.map(transaction => (
                <tr key={`transaction-${transaction.id}`}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTransactionsTable;
