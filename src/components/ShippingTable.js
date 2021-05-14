import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Button, FormControl, Grid} from '@material-ui/core';


//TesttabelleI Aufbau
const columnsShippingOrders =  ["Order No.", "Customer No.", "Postcode", "Date", "Order State"];
const dataShippingOrders = [
    ["1", "37", "88739", "15/2/2020", "Ready"],
    ["31", "232", "22131", "19/1/2020", "Ready"],
    ["122", "2441", "33245", "1/8/2019", "Ready"],
    ["123", "23", "77883", "18/2/2021", "Ready"],
];
const options = { customToolbarSelect: () => {}};


const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiTypography: {
          h6: {
            fontWeight: "600",
          }
      }
  }
});


const ShippingOrders = () => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}> 
      <MUIDataTable
        data={dataShippingOrders}
        columns={columnsShippingOrders}
        options={options}/>
    </MuiThemeProvider>
  )
}
            
export default ShippingOrders