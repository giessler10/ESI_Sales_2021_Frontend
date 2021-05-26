import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, FormControl, Grid, TextField, Select, MenuItem, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';


//TesttabelleI Aufbau
const columnsAuftraege = ["Position", "Produkt", "Menge", "Grund der Retoure / QS"];
const dataAuftraege = [
  ["1", "T-Shirt", "7"],
  ["2", "Socken", "10"],
  ["3", "Shirt mit Logo", "15"],
];



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