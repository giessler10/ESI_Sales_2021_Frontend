import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import FullScreenDialogCustomerDetails from './FullScreenDialogCustomerDetails';
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-ui/core';

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/

export default function CustomerTable() {

  //Variables and constants  
  const [selectedData, setSelectedData] = useState([]);
  const [allData, setAllData] = useState([]); //alle Daten von DB.

  const columns = [
    { name: "C_NR", label: "Kunden-Nr", options: { filter: true, sort: true, display: true } },
    { name: "C_CT_ID", label: "Kundenart-Nr", options: { filter: true, sort: true, display: false } },
    { name: "C_COMPANY", label: "Firma", options: { filter: true, sort: false, display: true } },
    { name: "C_FIRSTNAME", label: "Vorname", options: { filter: true, sort: false, display: true } },
    { name: "C_LASTNAME", label: "Nachname", options: { filter: true, sort: false, display: true } },
    { name: "C_CI_PC", label: "Postleitzahl", options: { filter: true, sort: true, display: true } },
    { name: "CT_DESC", label: "Kundenart", options: { filter: true, sort: true, display: true } }];

  const options = {
    onRowSelectionChange: (curRowSelected, allRowsSelected) => {
      rowSelectEvent(curRowSelected, allRowsSelected);
      //No selection
      if (allRowsSelected.length === 0) {
        updateData();   //Daten aktualisieren
      }
    },
    customToolbarSelect: (selectedRows, data) => {
      var C_NR = data[selectedRows.data[0].index].data[0];
      return <div style={{ paddingRight: "10px" }}><FullScreenDialogCustomerDetails selectedRows={selectedRows.data} C_NR={C_NR} /></div>;
    },
    textLabels: {
      body: {
        noMatch: "Es wurden keine passenden Aufträge gefunden.",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      }
    },
    customToolbar: () => {
      /*
      return (
        <div>
          <Button
            onClick={updateView}
            style={{ float: "right" }}
            variant="outlined"
            color="primary"
            title="Aktualiseren"
          >
            Aktualisieren
          </Button>
        </div>
      );
      */
    },
    selectableRows: 'single'
  };


  useEffect(() => {
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers')
      .then(res => {

        setAllData(res.data); //Set new table data

      })
      .catch(error => {
        var errorObject = error.response.data;
        var errorMessage = errorObject.errorMessage;
        console.log(errorMessage); //Error-Handling
      })
  }, []);

  function updateData() {
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers')
      .then(res => {

        if (DataAreEqual(allData, res.data)) {
          return; //Check if data has changed
        }
        else {
          //console.log("Change Data");
          setAllData(res.data); //Set new table data
        }

      })
      .catch(err => {
        console.log(err.message); //Error-Handling
      })
  }

  //Check if old data = new data
  function DataAreEqual(data, newData) {
    var dataString = JSON.stringify(data);
    var newDataString = JSON.stringify(newData);

    if (dataString === newDataString) {
      //console.log("Equal");
      return true;
    }
    else {
      //console.log("Not equal");
      return false;
    }
  }

  const updateView = () => {
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers')
      .then(res => {

        setAllData(res.data); //Set new table data

      })
      .catch(error => {
        var errorObject = error.response.data;
        var errorMessage = errorObject.errorMessage;
        console.log(errorMessage); //Error-Handling
      })
  };

  document.getElementsByClassName("MUIDataTableBody-emptyTitle-175").innerHTML = "testest";

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
    <div>
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