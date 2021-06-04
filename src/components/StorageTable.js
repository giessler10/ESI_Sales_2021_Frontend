
import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import axios from "axios";
import AllInboxIcon from '@material-ui/icons/AllInbox';


export default function StorageOrders(){

//Variables and constants 
var logoBase64 = require('../img/logoBase64.js');

const [selectedData, setSelectedData] =  useState([]); 
const [allData, setAllData] = useState([]); //alle Daten von DB.

//Columns with properties
const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
{name: "O_C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: false }}, 
{name: "O_OT_NR", label: "Auftragsart-Nr", options: {filter: true,  sort: false,  display: false}}, 
{name: "O_OST_NR", label: "Auftragsstatus-Nr", options: {filter: true, sort: false, display: false}},  
{name: "O_TIMESTAMP_FORMAT", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
{name: "OT_DESC", label: "Auftragsart", options: {filter: true, sort: true, display: true}}, 
{name: "OST_DESC", label: "Auftragsstatus", options: {filter: true, sort: true, display: true}}, 
{name: "C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: true}}, 
{name: "C_CT_ID", label: "Kundenart-Nr", options: {filter: true, sort: true, display: false}}, 
{name: "C_COMPANY", label: "Firma", options: {filter: true, sort: false, display: true}},
{name: "C_FIRSTNAME", label: "Vorname",options: {filter: true,sort: false,display: true}},
{name: "C_LASTNAME",label: "Nachname",options: {filter: true,sort: false, display: true}},
{name: "C_CO_ID", label: "Ländercode", options: {filter: true,sort: false, display: false}},
{name: "C_CI_PC", label: "Postleitzahl", options: {filter: true,sort: true, display: true}},
{name: "C_STREET", label: "Straße", options: {filter: true,sort: true, display: true}},
{name: "C_HOUSENR", label: "Hausnummer", options: {filter: true,sort: true, display: true}},
{name: "C_EMAIL",label: "Email",options: {filter: true,sort: false, display: true}},
{name: "C_TEL",label: "Telefon",options: {filter: true,sort: false, display: true}},
{name: "CO_DESC",label: "Land",options: {filter: true,sort: false, display: true}},
{name: "CI_DESC",label: "Stadt",options: {filter: true,sort: false, display: true}},
{name: "CT_DESC", label: "Kundenart", options: {filter: true, sort: true, display: true}}];

 const options = { onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
 customToolbarSelect: () =>{return <Button disabled={MoreThan2Rows()} variant="outlined" color="primary" onClick={CreateDelivOrder}> <AllInboxIcon/>vom Lager bereitstellen</Button>;

},
textLabels: {
  body: {
    noMatch: "Es wurden keine passenden Aufträge gefunden.",
    toolTip: "Sort",
    columnHeaderTooltip: column => `Sort for ${column.label}`
  }
}};


 useEffect(() => {
  //Orders aus MySQL ziehen
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?status=8')
      .then(res => {
      console.log("Response Orderlist:", res); //Data from Gateway
      
      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.length === 0) { //Check if data is available
        setAllData(undefined);
        return;
      }          

      if (DataAreEqual(allData, res.data)) return; //Check if data has changed       
      setAllData(res.data); //Set new table data

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      })
});

  //Check if database is offline (AWS)
  function IsDataBaseOffline(res){
    if(res.data.errorMessage == null) return false; 
    if(res.data.errorMessage === 'undefined') return false;
    if(res.data.errorMessage.endsWith("timed out after 3.00 seconds")){
        alert("Database is offline (AWS).");
        return true;
    }     
    return false;
  }

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
 
  console.log("Selektierte Daten: ", _selectedData);
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


 //Aus Lager Button Click 
 function CreateDelivOrder(){

  //Check, vor PDF-Druck, dass nur 1 Datensatz ausgewählt ist
   if(selectedData.length > 1) {
    alert("Bitte nur ein Datensatz auswählen");
    return;
  }



      // Abfrage Orderitems
      axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' +  selectedData[0]["O_NR"] + '/orderitems')
      
      .then(res => {
        console.log("RESPONSE Orderitems:", res); //Data from Gateway
        
        if(IsDataBaseOffline(res)) return; //Check if db is available
    
        if(res.data.length === 0) { //Check if data is available
          //setOrderitemsData(undefined);
          return;
        }          
        
        //console.log("RESPOSNEDATE", res.data);
        //setOrderitemsData(res.data);
      
        //console.log("Orderitem Daten: ", OrderitemsData)
        //PdfCreate(res.data,logoBase64.src);
      
        })
        .catch(err => {
            console.log(err.message); //Error-Handling
        })
        
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
        options={options}/>
        <br></br>
    </MuiThemeProvider>

   </div>

  );            
}
