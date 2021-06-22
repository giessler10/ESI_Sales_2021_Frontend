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


const orderPositionHead = ["Order. No.", "Position", "Product", "Summe_QTY", "Problem"];
const DataOrderPosition = [
  ["1", "Schnitzelwerk", "B", "15/2/2020", "5"],
  ["2", "Christoph", "P", "15/2/2020", "5"],
  ["3", "Rockcafe Altdorf", "B", "15/2/2020", "5"],
  ["4", "Edeka", "B", "15/2/2020", "5"],
];

const options = { filterType: 'checkbox' };

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiTypography: {
      h6: {
        fontWeight: "600",
      }
    },

    textLabels: {
      body: {
        noMatch: "Es wurden keine passenden Aufträge gefunden.",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      }
    },
  }
});

const SpecOrderTable = () => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={DataOrderPosition}
        columns={orderPositionHead}
        options={options} />
    </MuiThemeProvider>
  )
}

export default SpecOrderTable