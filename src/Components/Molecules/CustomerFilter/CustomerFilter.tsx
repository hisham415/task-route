/** @format */

import React from "react";
import { ICustomer } from "../../../modal/Customer";

import "./CustomerFilter.styles.css";

interface CustomerFilterProps {
  customers: ICustomer[];
  selectedCustomer: number | null;
  onCustomerChange: (customerId: number) => void;
}

const CustomerFilter: React.FC<CustomerFilterProps> = ({
  customers,
  selectedCustomer,
  onCustomerChange,
}) => {
  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onCustomerChange(Number(event.target.value));
  };

  return (
    <div className="customer-filter-container">
      <select
        className="customer-filter-select"
        value={selectedCustomer || ""}
        onChange={handleCustomerChange}
      >
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerFilter;
