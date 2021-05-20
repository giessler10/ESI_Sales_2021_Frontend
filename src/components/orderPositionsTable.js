import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, FormControl, Grid, TextField, Select, MenuItem, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';


//TesttabelleI Aufbau
const columnsAuftraege = ["Position", "Product", "Quantity", " "];
const dataAuftraege = [
  ["1", "T-Shirt", "7",  <Button
  style={{ background: "#006064", color: "#ffffff"}}
  type="submit"
  variant="contained"
  title="Kunde anlegen">
  Retouren anzeigen
</Button>],
  ["2", "Socken", "10", <Button
  style={{ background: "#006064", color: "#ffffff"}}
  type="submit"
  variant="contained"
  title="Kunde anlegen">
  Retouren anzeigen
</Button>],
  ["3", "Shirt mit Logo", "15",<Button
  style={{ background: "#006064", color: "#ffffff"}}
  type="submit"
  variant="contained"
  title="Kunde anlegen">
  Retouren anzeigen
</Button>],
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