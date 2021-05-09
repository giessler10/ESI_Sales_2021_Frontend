import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

//TesttabelleIII Aufbau
const columnsAuftraegeMitProblemen = ["Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY", "Order_Status", "Problems"];
const dataAuftraegeMitProblemen = [
  ["112", "Lena", "B", "15/2/2020", "5", "", ""],
  ["23", "Max", "P", "15/2/2020", "5", "", ""],
  ["22", "Deutsche Post", "B", "15/2/2020", "5", "", ""],
  ["32", "Luca", "B","15/2/2020", "5", "", ""],
];
//TesttabelleIII Aufbau Ende


const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiTypography: {
          h6: {
            fontWeight: "600",
          }
      }
  }
});


const options = {filterType: 'checkbox'};

const ProblemOrders = () => {
    return (
      <MuiThemeProvider theme={getMuiTheme()}> 

<MUIDataTable
              data={dataAuftraegeMitProblemen}
              columns={columnsAuftraegeMitProblemen}
              options={options}/>

      </MuiThemeProvider>
              )
            }
            
            export default ProblemOrders