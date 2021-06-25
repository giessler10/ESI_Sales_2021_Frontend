import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import QualityCell from './QualityCell';

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/

const useStyles = makeStyles((theme) => ({
  root: {
    //overflow: 'auto',
    //width: '100%',
  }
}));


export default function RetoureHistoryTable(props) {

  //Variables and constants  
  const [selectedData, setSelectedData] = useState([]);
  const [allData, setAllData] = useState([]); //alle Daten von DB.

  const classes = useStyles();

  //Columns with properties
  const columns = [
    { name: "IR_OI_NR", label: "Position", options: { filter: true, sort: true, display: true } },
    { name: "RT_DESC", label: "Art", options: { filter: true, sort: true, display: true } },
    { name: "IR_COMMENT", label: "Grund", options: { filter: true, sort: true, display: true } },
    { name: "IR_QTY", label: "Gemeldete Menge", options: { filter: true, sort: true, display: true } },
    { name: "IR_O_NR", label: "Bestell-Nr", options: { filter: true, sort: true, display: false } },
    { name: "IReturnST_DESC", label: "Status", options: { filter: true, sort: false, display: true } },
    { name: "OI_MATERIALDESC", label: "Materialbeschreibung", options: { filter: true, sort: false, display: true } },
    { name: "OI_HEXCOLOR", label: "Farbwert", options: { filter: true, sort: true, display: true } },
    {
      name: "OI_HEXCOLOR", label: "Farbe", options: {
        filter: true, sort: true, display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <QualityCell
              value={value}
              index={tableMeta.columnIndex}
              change={event => updateValue(event)}
            />
          );
        }
      }
    },
    { name: "IM_FILE", label: "Bild", options: { filter: true, sort: true, display: true } },
    { name: "OI_PRICE", label: "Preis", options: { filter: true, sort: true, display: true } },
    { name: "OI_VAT", label: "Mehrwertsteuer", options: { filter: true, sort: true, display: true } }
  ];

  const options = {
    onRowSelectionChange: (curRowSelected, allRowsSelected) => { rowSelectEvent(curRowSelected, allRowsSelected); },
    customToolbarSelect: () => { },
    textLabels: {
      body: {
        noMatch: "Keine Probleme.",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      }
    },
    selectableRows: false
  };

  useEffect(() => {

    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + props.OI_O_NR + '/itemReturn')
      .then(res => {

        setAllData(res.data); //Set new table data
        return res.data;

      })
      .catch(error => {
        var errorObject = error.response.data;
        var errorMessage = errorObject.errorMessage;
        console.log(errorMessage); //Error-Handling
      })

  }, []);


  //Get selected rows
  function rowSelectEvent(curRowSelected, allRowsSelected) {

    var _selectedData = [];

    //No selection
    if (allRowsSelected.length === 0) {
      setSelectedData(undefined);
      return;
    }

    //Loop over all entries 
    allRowsSelected.forEach(element => {
      _selectedData.push(allData[element.dataIndex])
    });

    //console.log("Selektierte Daten: ", _selectedData)
    setSelectedData(_selectedData);
    return;
  }

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTypography: {
        h6: {
          fontWeight: "600",
        }
      }
    }
  });

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={getMuiTheme()} >
        <MUIDataTable
          data={allData}
          columns={columns}
          options={options} />
        <br></br>
      </MuiThemeProvider>
    </div>
  );
}