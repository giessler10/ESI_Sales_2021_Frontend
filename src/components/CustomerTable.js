import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import FullScreenDialogCustomerDetails from'./FullScreenDialogCustomerDetails';

//TesttabelleI Aufbau
const columnsCustomers = ["Detailanzeige", "Customer No.", "Firstname", "Lastname", "Postcode ZIP", "Customer Type"];
const dataCustomers = [
  [<div><FullScreenDialogCustomerDetails/></div>, "1", "Lena", "Müller", "77865", "B"],
  [<div><FullScreenDialogCustomerDetails/></div>,"2", "Marco", "Braun", "67889", "P"],
  [<div><FullScreenDialogCustomerDetails/></div>,"3", "Siggy", "Franz", "11029", "P"],
  [<div><FullScreenDialogCustomerDetails/></div>,"4", "Mira", "Graf", "77817", "P"],
  [<div><FullScreenDialogCustomerDetails/></div>,"5", "Ludwig", "Steininger", "45467", "B"],
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

const AllCustomers = () => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}> 
    <MUIDataTable
      data={dataCustomers}
      columns={columnsCustomers}/>
    </MuiThemeProvider>
  )
}
            
export default AllCustomers