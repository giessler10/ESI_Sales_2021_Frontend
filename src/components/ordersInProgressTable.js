import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//importierte Seiten
import OrderDetails from './specOrderDetails';



//TesttabelleII Aufbau
const columnsAuftraegeInBearbeitung = ["Bearbeitung", "Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY", "Papiere", "Order_Status"];
const dataAuftraegeInBearbeitung = [
  [<div><Button component={Link} to="/OrderDetails" key="OrderDetails" style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "12", "Lena", "B", "15/2/2020", "5", "", ""],
  [<div><Button style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "21", "Max", "P", "15/2/2020", "5", "", ""],
  [<div><Button style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "332", "Deutsche Post", "B", "15/2/2020", "5", "", ""],
  [<div><Button style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "41", "Luca", "B","15/2/2020", "5", "", ""],
];
//TesttabelleII Aufbau Ende


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



const ProgressOrders = () => {
    return (
     

      <MuiThemeProvider theme={getMuiTheme()}> 
<MUIDataTable
              data={dataAuftraegeInBearbeitung}
              columns={columnsAuftraegeInBearbeitung}
              options={options}/>
<Switch>
<Router>
<Route exact path="/OrderDetails">
<OrderDetails />
</Route>
</Router>
</Switch>
      </MuiThemeProvider>


              )
            }
            
            export default ProgressOrders