import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

//TesttabelleI Aufbau
const columnsAuftraege = ["Position", "Product", "Quantity", "Problem"];
const dataAuftraege = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
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
            title="Auftragsbestandteile"
            data={dataAuftraege}
            columns={columnsAuftraege}/>
        </MuiThemeProvider>
    )
}
            
export default RecentProblems