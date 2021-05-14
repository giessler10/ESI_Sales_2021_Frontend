import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

//TesttabelleI Aufbau
const columnsCustomers = ["Customer No.", "Customer Firstname", "Customer Lastname", "Customer ZIP", "Customer Type"];
const dataCustomers = [
  ["1", "Lena", "Müller", "77865", "B"],
  ["2", "Marco", "Braun", "67889", "P"],
  ["3", "Siggy", "Franz", "11029", "P"],
  ["4", "Mira", "Graf", "77817", "P"],
  ["5", "Ludwig", "Steininger", "45467", "B"],
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