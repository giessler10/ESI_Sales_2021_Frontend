import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

//TesttabelleI Aufbau
const columnsAuftraege = ["Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY", "Order_status"];
const dataAuftraege = [
  ["1", "Schnitzelwerk", "B", "15/2/2020", "5", "versand"],
  ["2", "Christoph", "P", "15/2/2020", "5", "versand"],
  ["3", "Rockcafe Altdorf", "B", "15/2/2020", "5", "produktion"],
  ["4", "Edeka", "B","15/2/2020", "5", "in Progress"],
];
//TesttabelleI Aufbau Ende

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiTypography: {
          h6: {
            fontWeight: "600",
          }
      }
  }
});

const SearchTable = () => {
    return (
      <MuiThemeProvider theme={getMuiTheme()}> 
    <MUIDataTable
              title="Suchergebnis"
              data={dataAuftraege}
              columns={columnsAuftraege}/>
      </MuiThemeProvider>
              )
            }
            
            export default SearchTable