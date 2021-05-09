import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


//TesttabelleI Aufbau
const columnsOffeneAuftraege = ["Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY"];
const dataOffeneAuftraege = [
  ["1", "Schnitzelwerk", "B", "15/2/2020", "5"],
  ["2", "Christoph", "P", "15/2/2020", "5"],
  ["3", "Rockcafe Altdorf", "B", "15/2/2020", "5"],
  ["4", "Edeka", "B","15/2/2020", "5"],
];
//TesttabelleI Aufbau Ende

const options = {filterType: 'checkbox'};

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiTypography: {
          h6: {
            fontWeight: "600",
          }
      }
  }
});



const OpenOrders = () => {
    return (
      <MuiThemeProvider theme={getMuiTheme()}> 
            <MUIDataTable
              data={dataOffeneAuftraege}
              columns={columnsOffeneAuftraege}
              options={options}/>

      </MuiThemeProvider>
              )
            }
            
            export default OpenOrders