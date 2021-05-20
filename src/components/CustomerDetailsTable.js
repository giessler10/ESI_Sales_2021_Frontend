import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

//TesttabelleI Aufbau
const columnsCustomersDetails = ["Customer No.", "Firstname", "Lastname", "Streetname", "Housenumber", "City", "Postcode", "Mail-Address", "Phone Number", "Customer Type"];
const dataCustomersDetails = [
  ["1", "Lena", "Müller", "Lange Straße", "205", "Achern", "77865", "lena@web.de", "01778263718", "B"],
  ["2", "Marco", "Braun", "Erlenweg", "2", "67889", "Maisen", "Marco96@t-online.de", "0782037288", "P"],
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

const CustomerDetails = () => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}> 
    <MUIDataTable
      data={dataCustomersDetails}
      columns={columnsCustomersDetails}/>
    </MuiThemeProvider>
  )
}
            
export default CustomerDetails