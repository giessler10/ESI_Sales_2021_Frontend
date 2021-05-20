import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';


//import Full Screen
import FullScreenRetoure from'./FullScreenRetoureDialog';


//TesttabelleI Aufbau
const columnsAuftraege = [" ","Order. No.", "customer_number","customer_name", "Order_date", "Order_status"];
const dataAuftraege =   [
[<div><FullScreenRetoure/></div>, "12", "1", "Lena",  "15/2/2020", "Retoure"],
[<div><FullScreenRetoure/></div>,  "21", "1","Max",  "15/2/2020", "Retoure"],
[<div><FullScreenRetoure/></div>,  "332", "1", "Deutsche Post",  "15/2/2020", "Retoure"],
[<div><FullScreenRetoure/></div>,  "41","1", "Luca", "15/2/2020", "irgendwas"],
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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textColor: "green",
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },  
}));

const RetoureTable = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <h2 >Retoure & Reklamation</h2>
      </Grid>
      <MuiThemeProvider theme={getMuiTheme()}> 
        <MUIDataTable
          data={dataAuftraege}
          columns={columnsAuftraege}/>
      </MuiThemeProvider>
    </div>
  )
}
          
export default RetoureTable