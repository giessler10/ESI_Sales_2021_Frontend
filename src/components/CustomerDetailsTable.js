import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


const columnsCustomersDetails = ["Customer No.", "Firstname", "Lastname", "Streetname", "Housenumber", "City", "Postcode", "Mail-Address", "Phone Number", "Customer Type"];
const dataCustomersDetails = [
  ["1", "Lena", "Müller", "Lange Straße", "205", "Achern", "77865", "lena@web.de", "01778263718", "B"],
  ["2", "Marco", "Braun", "Erlenweg", "2", "67889", "Maisen", "Marco96@t-online.de", "0782037288", "P"],
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

const useStyles = theme => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  error: {
    color: "red"
  },
  errorAlert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
});

const options = {
  textLabels: {
    body: {
      noMatch: "Es wurden keine passenden Aufträge gefunden.",
      toolTip: "Sort",
      columnHeaderTooltip: column => `Sort for ${column.label}`
    }
  }
};

const CustomerDetails = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={dataCustomersDetails}
        columns={columnsCustomersDetails} />
      options={options}
    </MuiThemeProvider>
  )
}

export default CustomerDetails