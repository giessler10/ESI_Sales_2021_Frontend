import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/

const columnsAuftraege = ["Position", "Product", "Quantity", "Problem"];
const dataAuftraege = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
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
            title="Auftragsbestandteile"
            data={dataAuftraege}
            columns={columnsAuftraege}
            options={options}/>
        </MuiThemeProvider>
    )
}
            
export default RecentProblems