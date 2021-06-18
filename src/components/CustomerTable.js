import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import FullScreenDialogCustomerDetails from'./FullScreenDialogCustomerDetails';
import { useState, useEffect} from "react";
import axios from "axios";
import { Button } from '@material-ui/core';

export default function CustomerTable(){

  //Variables and constants  
  const [selectedData, setSelectedData] =  useState([]); 
  const [allData, setAllData] = useState([]); //alle Daten von DB.


  //Columns with properties --> TODO auf eure Spaltennamen anpassen
  const columns = [
  {name: "C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: true}}, 
  {name: "C_CT_ID", label: "Kundenart-Nr", options: {filter: true, sort: true, display: false}}, 
  {name: "C_COMPANY", label: "Firma", options: {filter: true, sort: false, display: true}},
  {name: "C_FIRSTNAME", label: "Vorname",options: {filter: true,sort: false,display: true}},
  {name: "C_LASTNAME",label: "Nachname",options: {filter: true,sort: false, display: true}},
  {name: "C_CI_PC", label: "Postleitzahl", options: {filter: true,sort: true, display: true}},
  {name: "CT_DESC", label: "Kundenart", options: {filter: true, sort: true, display: true}}];

  const options = { onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
    customToolbarSelect: (selectedRows, data) => {
      var C_NR = data[selectedRows.data[0].index].data[0];
      return  <div style={{ paddingRight: "10px"}}><FullScreenDialogCustomerDetails selectedRows={selectedRows.data} C_NR={C_NR}/></div>;
    },
    textLabels: {
      body: {
        noMatch: "Es wurden keine passenden Aufträge gefunden.",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      }
    },
    customToolbar: () => {
      return (
        <div>
          <Button
            onClick={updateView}
            style={{ float: "right"}}
            variant="outlined"
            color="primary"
            title="Aktualiseren"
            >
              Aktualisieren
          </Button>
        </div>
      );
    },
    selectableRows: 'single'
  };


useEffect(() => {
  // --> TODO  eurem REST Link einfügen
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers')
      .then(res => {
      //console.log("RESPONSE:", res); //Data from Gateway

      if(res.data.length === 0) { //Check if data is available
        setAllData(undefined);
        return;
      }          

      if (DataAreEqual(allData, res.data)) return; //Check if data has changed       
      setAllData(res.data); //Set new table data

      })
      .catch( error => {
        var errorObject = error.response.data;
        var errorMessage = errorObject.errorMessage;
        console.log(errorMessage); //Error-Handling
      })
});

const updateView = () => {
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers')
  .then(res => {
  //console.log("RESPONSE:", res); //Data from Gateway

  if(res.data.length === 0) { //Check if data is available
    setAllData(undefined);
    return;
  }          

  setAllData(res.data); //Set new table data

  })
  .catch( error => {
    var errorObject = error.response.data;
    var errorMessage = errorObject.errorMessage;
    console.log(errorMessage); //Error-Handling
  })
};

document.getElementsByClassName("MUIDataTableBody-emptyTitle-175").innerHTML = "testest";

//Check if old data = new data
function DataAreEqual(data, sortedOrders){
  if(data.sort().join(',') === sortedOrders.sort().join(',')){
    return true;
    }
    else return false;
  }

//Get selected rows
function rowSelectEvent(curRowSelected, allRowsSelected){  

  var _selectedData = [];

  //No selection
  if(allRowsSelected.length === 0) { 
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

function MoreThan2Rows(selectedRows){
  if(selectedRows != undefined){
    if(selectedRows.length > 1){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
};

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
        options={options}/>
        <br></br>
    </MuiThemeProvider>
   </div>
  );            
}