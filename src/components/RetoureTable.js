import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


//import Full Screen
import FullScreenRetoure from'./FullScreenRetoureDialog';


//TesttabelleI Aufbau
const columnsAuftraege = [" ","Order. No.", "customer_number","customer_name", "Order_date", "Order_status"];
const dataAuftraege =   [
[<div><FullScreenRetoure/></div>, "12", "1", "Lena",  "15/2/2020", "Retoure"],
[<div><FullScreenRetoure/></div>,  "21", "1","Max",  "15/2/2020", "Retoure"],
[<div><FullScreenRetoure/></div>,  "332", "1", "Deutsche Post",  "QS", "5"],
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

const RetoureTable = () => {
    return (
      <MuiThemeProvider theme={getMuiTheme()}> 
    <MUIDataTable
              title="Aufträge"
              data={dataAuftraege}
              columns={columnsAuftraege}/>
      </MuiThemeProvider>
              )
            }
            
            export default RetoureTable