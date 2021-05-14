import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

//TesttabelleI Aufbau
const columnsShippingOrders =  ["Order No.", "Customer No.", "Order Type", "Order State", "Date"];
const dataShippingOrders = [
    ["1", "37", "B", "In Production", "15/2/2020"],
    ["31", "232", "P", "Customer", "19/1/2020"],
    ["122", "2441", "B", "Shipping", "1/8/2019"],
    ["123", "23", "P", "In Production", "18/2/2021"],
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

const ShippingOrders = () => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}> 
    <MUIDataTable
      data={dataShippingOrders}
      columns={columnsShippingOrders}/>
    </MuiThemeProvider>
  )
}
            
export default ShippingOrders