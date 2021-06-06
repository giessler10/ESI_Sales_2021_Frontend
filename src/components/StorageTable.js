
import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import axios from "axios";

import FullScreenDialogOrderDetails from'./FullScreenDialogOrderDetails';
import StorageButton from'./StorageButton';
import { Grid } from "@material-ui/core";


export default function StorageOrders(){

  const [selectedData, setSelectedData] =  useState([]); 
  const [allData, setAllData] = useState([]); //alle Daten von DB.

  //Columns with properties
  const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
  {name: "O_C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: false }}, 
  {name: "O_OST_NR", label: "Auftragsstatus-Nr", options: {filter: true, sort: false, display: false}},  
  {name: "O_TIMESTAMP_FORMAT", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
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

  const options = { 
    onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
    customToolbarSelect: (selectedRows, data) => {
      var order = data[selectedRows.data[0].index].data;
      var OI_O_NR = data[selectedRows.data[0].index].data[0];
      return  <div>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <div style={{ paddingRight: "10px"}}>
            <FullScreenDialogOrderDetails selectedRows={selectedRows.data} OI_O_NR={OI_O_NR} order={order}/>
          </div>
          <div style={{ paddingRight: "10px"}}>
            <StorageButton O_NR={OI_O_NR} body={CreateDelivOrderBody()}/>
          </div>
        </Grid>
        </div>;
    },
    textLabels: {
      body: {
        noMatch: "Es wurden keine passenden Aufträge gefunden.",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      }
    }
  };


  useEffect(() => {
    //Orders aus MySQL ziehen
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?status=8')
        .then(res => {
        //console.log("Response Orderlist:", res); //Data from Gateway

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

  //Body Objekt erzeugen
  function CreateDelivOrderBody(){
    var body = []
    if(selectedData == undefined){
      return body;
    }
    else if(selectedData.length == 0){
      return body;
    }
    else{
      selectedData.forEach((currentOrder, index) => {
          var order = {
            "O_NR": currentOrder.O_NR
          }
          body.push(order);
        }
      );
      return body;
    }
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
