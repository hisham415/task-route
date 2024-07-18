/** @format */

import React, { useEffect, useState } from "react";
import "./LandingPage.styles.css";
import axios from "axios";
import { ICustomer } from "../../../modal/Customer"; 
import { ITransaction } from "../../../modal/Transaction"; 
import { ICombinedData } from "../../../modal/CombinedData"; 
import Chart from "../../Organisms/Chart/Chart";
import CustomerTransactionsTable from "../../Organisms/Table/CustomerTransactionsTable";

const apiUrl = "https://6518be3d818c4e98ac5fea3e.mockapi.io";

const LandingPage: React.FC = () => {
  const [combinedData, setCombinedData] = useState<ICombinedData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, transactionsResponse] = await Promise.all([
          axios.get(`${apiUrl}/Customers`),
          axios.get(`${apiUrl}/Transactions`),
        ]);

        const customersData: ICustomer[] = customersResponse.data;
        const transactionsData: ITransaction[] = transactionsResponse.data;

        const combinedData: ICombinedData = {
          customers: customersData,
          transactions: transactionsData,
        };

        setCombinedData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landing-page-container">
      <div className="HeaderTitleContainer">
        <p>Route</p>
      </div>
      {combinedData && (
        <>
          <div className="chart-container">
            <Chart combinedData={combinedData} />
          </div>
          <div className="table-container">
            <CustomerTransactionsTable combinedData={combinedData} />
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
