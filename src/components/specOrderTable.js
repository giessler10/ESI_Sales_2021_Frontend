import React from 'react';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


//TesttabelleI Aufbau
const orderPositionHead = ["Order. No.", "Position", "Product", "Summe_QTY", "Problem"];
const DataOrderPosition = [
  ["1", "Schnitzelwerk", "B", "15/2/2020", "5"],
  ["2", "Christoph", "P", "15/2/2020", "5"],
  ["3", "Rockcafe Altdorf", "B", "15/2/2020", "5"],
  ["4", "Edeka", "B","15/2/2020", "5"],
];
//TesttabelleI Aufbau Ende

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
  


const SpecOrderTable = () => {
    return (
        <MuiThemeProvider theme={getMuiTheme()}> 

        <MUIDataTable
                      data={DataOrderPosition}
                      columns={orderPositionHead}
                      options={options}/>
        
              </MuiThemeProvider>
                      )
                    }
                    
export default SpecOrderTable