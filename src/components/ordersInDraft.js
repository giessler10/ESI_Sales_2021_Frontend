import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import FullScreenDialogOrderDetails from'./FullScreenDialogOrderDetails';
import { useState, useEffect} from "react";
import axios from "axios";


export default function DraftOrders(){

  //Variables and constants  
  const [selectedData, setSelectedData] =  useState([]); 
  const [allData, setAllData] = useState([]); //alle Daten von DB.


  //Columns with properties --> TODO auf eure Spaltennamen anpassen
  const columns = [
  { name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
  {name: "O_C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: false }}, 
  {name: "O_OT_NR", label: "Auftragsart-Nr", options: {filter: true,  sort: false,  display: false}}, 
  {name: "O_OST_NR", label: "Auftragsstatus-Nr", options: {filter: true, sort: false, display: false}},  
  {name: "O_TIMESTAMP", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
  {name: "OT_DESC", label: "Auftragsart", options: {filter: true, sort: true, display: true}}, 
  {name: "OST_DESC", label: "Auftragsstatus", options: {filter: true, sort: true, display: true}}, 
  {name: "C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: false}}, 
  {name: "C_CT_ID", label: "Kundenart-Nr", options: {filter: true, sort: true, display: false}}, 
  {name: "C_COMPANY", label: "Firma", options: {filter: true, sort: false, display: true}},
  {name: "C_FIRSTNAME", label: "Vorname",options: {filter: true,sort: false,display: true}},
  {name: "C_LASTNAME",label: "Nachname",options: {filter: true,sort: false, display: true}},
  {name: "C_CO_ID", label: "Ländercode", options: {filter: true,sort: false, display: false}},
  {name: "C_CI_PC", label: "Postleitzahl", options: {filter: true,sort: true, display: false}},
  {name: "C_STREET", label: "Straße", options: {filter: true,sort: true, display: false}},
  {name: "C_HOUSENR", label: "Hausnummer", options: {filter: true,sort: true, display: false}},
  {name: "C_EMAIL",label: "Email",options: {filter: true,sort: false, display: false}},
  {name: "C_TEL",label: "Telefon",options: {filter: true,sort: false, display: false}},
  {name: "CO_DESC",label: "Land",options: {filter: true,sort: false, display: false}},
  {name: "CI_DESC",label: "Stadt",options: {filter: true,sort: false, display: false}},
  {name: "CT_DESC", label: "Kundenart", options: {filter: true, sort: true, display: false}}];

  const options = {filterType: 'checkbox', onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
  customToolbarSelect: (selectedRows, data) => {
    var OI_O_NR = data[selectedRows.data[0].index].data[0];
    return  <div style={{ paddingRight: "10px"}}><FullScreenDialogOrderDetails selectedRows={selectedRows.data} OI_O_NR={OI_O_NR}/></div>;
  }
};

useEffect(() => {
  // Get Customerdata
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?status=9')
      .then(res => {

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
 
  console.log("Selektierte Daten: ", _selectedData)
  setSelectedData(_selectedData);
  return;
 }

 //Lieferschein Button Click 
 function OpenMore(){
  <div><FullScreenDialogOrderDetails/></div>
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
    <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable
      data={allData} 
      columns={columns}
      options={options}/> 
    </MuiThemeProvider>
  );        
}