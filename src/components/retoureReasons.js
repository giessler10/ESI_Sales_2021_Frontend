import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

//TesttabelleI Aufbau
const columnsAuftraege = ["Position", "Product", "Quantity", "Problem"];
const dataAuftraege = [
  ["1", "T-shirt", "2", "hat mir nicht gefallen"],
  ["2", "Unterhose", "3", "hat nicht gepasst"],
  ["3", "Socken", "5", "Falsche Lieferung"],
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

const RecentProblems = () => {
    return (
        <MuiThemeProvider theme={getMuiTheme()}> 
        <MUIDataTable
            data={dataAuftraege}
            columns={columnsAuftraege}/>
        </MuiThemeProvider>
    )
}
            
export default RecentProblems