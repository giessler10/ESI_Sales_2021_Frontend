import React from 'react';
import MUIDataTable from "mui-datatables";

//TesttabelleI Aufbau
const columnsAuftraege = ["Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY"];
const dataAuftraege = [
  ["1", "Schnitzelwerk", "B", "15/2/2020", "5"],
  ["2", "Christoph", "P", "15/2/2020", "5"],
  ["3", "Rockcafe Altdorf", "B", "15/2/2020", "5"],
  ["4", "Edeka", "B","15/2/2020", "5"],
];
//TesttabelleI Aufbau Ende


const RecentOrders = () => {
    return (
    <MUIDataTable
              data={dataAuftraege}
              columns={columnsAuftraege}/>
              )
            }
            
            export default RecentOrders