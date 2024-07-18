/** @format */

import React, { useEffect, useState } from "react";
import "./Chart.styles.css";
import { ICombinedData } from "../../../modal/CombinedData";
import CustomerFilter from "../../Molecules/CustomerFilter/CustomerFilter";
import {
  filterTransactionsByCustomer,
  getTransactionAmounts,
  getTransactionDates,
} from "./ChartUtil";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { format } from "date-fns";
import { ITransaction } from "../../../modal/Transaction";

interface ChartProps {
  combinedData: ICombinedData;
}

const Chart: React.FC<ChartProps> = ({ combinedData }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<number | undefined>(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (selectedCustomer !== null) {
      const transactions = filterTransactionsByCustomer(
        combinedData.transactions,
        selectedCustomer
      );
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions([]);
    }
  }, [selectedCustomer, combinedData]);

  useEffect(() => {
    if (filteredTransactions.length > 0) {
      const dates = getTransactionDates(filteredTransactions);
      const startDate = new Date(dates[0]).getTime();
      const endDate = new Date(dates[dates.length - 1]).getTime();
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
    } else {
      setSelectedStartDate(undefined);
      setSelectedEndDate(undefined);
    }
  }, [filteredTransactions]);

  const handleCustomerChange = (customerId: number) => {
    setSelectedCustomer(customerId);
  };

  const getFormattedDates = () => {
    return getTransactionDates(filteredTransactions).map((timestamp) =>
      format(new Date(timestamp), "yyyy-MM-dd")
    );
  };

  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
      categories: getFormattedDates(),
      min: selectedStartDate,
      max: selectedEndDate,
      labels: {
        formatter: function (val: any) {
          return format(new Date(val), "yyyy-MM-dd");
        },
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
        rotate: -45, // Rotating labels for better spacing
        offsetY: 10,
      },
    },
    tooltip: {
      x: {
        format: 'yyyy-MM-dd',
      },
    },
  };

  const series = [
    {
      name: "series-1",
      data: getTransactionAmounts(filteredTransactions),
    },
  ];

  return (
    <div className="chart-wrapper">
      <CustomerFilter
        customers={combinedData.customers}
        selectedCustomer={selectedCustomer}
        onCustomerChange={handleCustomerChange}
      />
      <div className="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} width="100%" />
      </div>
    </div>
  );
};

export default Chart;
