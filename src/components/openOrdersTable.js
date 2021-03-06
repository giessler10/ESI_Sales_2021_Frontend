import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import FullScreenDialogOrderDetails from './FullScreenDialogOrderDetails';
import { useState, useEffect } from "react";
import axios from "axios";


/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


export default function ProgressOrders() {

  //Variables and constants  
  const [selectedData, setSelectedData] = useState([]);
  const [allData, setAllData] = useState([]); //alle Daten von DB.

  const columns = [
    { name: "O_NR", label: "Bestell-Nr", options: { filter: true, sort: true, display: true } },
    { name: "O_C_NR", label: "Kunden-Nr", options: { filter: true, sort: true, display: false } },
    { name: "O_OST_NR", label: "Auftragsstatus-Nr", options: { filter: true, sort: false, display: false } },
    { name: "O_TIMESTAMP_FORMAT", label: "Bestelldatum", options: { filter: true, sort: true, display: true } },
    { name: "OST_DESC", label: "Auftragsstatus", options: { filter: true, sort: true, display: true } },
    { name: "C_NR", label: "Kunden-Nr", options: { filter: true, sort: true, display: false } },
    { name: "C_CT_ID", label: "Kundenart-Nr", options: { filter: true, sort: true, display: false } },
    { name: "C_COMPANY", label: "Firma", options: { filter: true, sort: false, display: true } },
    { name: "C_FIRSTNAME", label: "Vorname", options: { filter: true, sort: false, display: true } },
    { name: "C_LASTNAME", label: "Nachname", options: { filter: true, sort: false, display: true } },
    { name: "C_CO_ID", label: "Ländercode", options: { filter: true, sort: false, display: false } },
    { name: "C_CI_PC", label: "Postleitzahl", options: { filter: true, sort: true, display: false } },
    { name: "C_STREET", label: "Straße", options: { filter: true, sort: true, display: false } },
    { name: "C_HOUSENR", label: "Hausnummer", options: { filter: true, sort: true, display: false } },
    { name: "C_EMAIL", label: "Email", options: { filter: true, sort: false, display: false } },
    { name: "C_TEL", label: "Telefon", options: { filter: true, sort: false, display: false } },
    { name: "CO_DESC", label: "Land", options: { filter: true, sort: false, display: false } },
    { name: "CI_DESC", label: "Stadt", options: { filter: true, sort: false, display: false } },
    { name: "CT_DESC", label: "Kundenart", options: { filter: true, sort: true, display: false } }];

  const options = {
    filterType: 'checkbox',
    onRowSelectionChange: (curRowSelected, allRowsSelected) => { rowSelectEvent(curRowSelected, allRowsSelected); },
    customToolbarSelect: (selectedRows, data) => {
      var order = data[selectedRows.data[0].index].data;
      var OI_O_NR = data[selectedRows.data[0].index].data[0];
      return <div style={{ paddingRight: "10px" }}><FullScreenDialogOrderDetails selectedRows={selectedRows.data} OI_O_NR={OI_O_NR} order={order} /></div>;
    },
    textLabels: {
      body: {
        noMatch: "Es wurden keine passenden Aufträge gefunden.",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      }
    },
    selectableRows: 'single'
  };

  useEffect(() => {
    // Get Customerdata
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?status=1')
      .then(res => {

        setAllData(res.data); //Set new table data

      })
      .catch(err => {
        console.log(err.message); //Error-Handling
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
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={allData}
        columns={columns}
        options={options} />
    </MuiThemeProvider>
  );
}