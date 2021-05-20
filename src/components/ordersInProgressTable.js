import React from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import FullScreenDialogCustomerDetails from'./FullScreenDialogCustomerDetails';
import { useState, useEffect} from "react";
import axios from "axios";


//importierte Seiten
import OrderDetails from './specOrderDetails';
import FullScreenDialog from'./FullScreenDialog';


export default function ProgressOrders(){

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
  customToolbarSelect: () => {return  <div><FullScreenDialogCustomerDetails/></div>;}
};

useEffect(() => {
  // Get Customerdata
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?status=2')
      .then(res => {
      console.log("RESPONSE:", res); //Data from Gateway
      
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
 
  console.log("Selektierte Daten: ", _selectedData)
  setSelectedData(_selectedData);
  return;
 }

 //Lieferschein Button Click 
 function OpenMore(){
  <div><FullScreenDialogCustomerDetails/></div>
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

/* Alter Code:
import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//importierte Seiten
import OrderDetails from './specOrderDetails';
import FullScreenDialog from'./FullScreenDialog';

//TesttabelleII Aufbau
const columnsAuftraegeInBearbeitung = ["Bearbeitung", "Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY", "Papiere", "Order_Status"];
const dataAuftraegeInBearbeitung = [
  [<div><FullScreenDialog/></div>, "12", "Lena", "B", "15/2/2020", "5", "", ""],
  [<div><FullScreenDialog/></div>, "21", "Max", "P", "15/2/2020", "5", "", ""],
  [<div><FullScreenDialog/></div>, "332", "Deutsche Post", "B", "15/2/2020", "5", "", ""],
  [<div><FullScreenDialog/></div>, "41", "Luca", "B","15/2/2020", "5", "", ""],
];
//TesttabelleII Aufbau Ende

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

const ProgressOrders = () => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}> 
    <MUIDataTable
      data={dataAuftraegeInBearbeitung}
      columns={columnsAuftraegeInBearbeitung}
      options={options}/>
      <Switch>
        <Router>
          <Route exact path="/OrderDetails">
            <OrderDetails />
          </Route>
        </Router>
      </Switch>
    </MuiThemeProvider>
  )
}
            
export default ProgressOrders


/*