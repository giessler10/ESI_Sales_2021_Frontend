import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import axios from "axios";
import QualityCell from './QualityCell.js';
import FullScreenDialogOrderDetails from "./FullScreenDialogOrderDetails.js";

export default function CustomerOrders(props){

  //Variables and constants  
  const [selectedData, setSelectedData] =  useState([]); 
  const [allData, setAllData] = useState([]); //alle Daten von DB.

  //Columns with properties --> TODO auf eure Spaltennamen anpassen
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
  {name: "HEXCOLOR", label: "Farbe", options: {filter: true,sort: true, display: true,
    customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );} }},
];

  const options = { onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
  customToolbarSelect: (selectedRows, data) => {
    var order = data[selectedRows.data[0].index].data;
    var OI_O_NR = data[selectedRows.data[0].index].data[0];
    return  <div style={{ paddingRight: "10px"}}><FullScreenDialogOrderDetails selectedRows={selectedRows.data} OI_O_NR={OI_O_NR} order={order}/></div>;
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
  var C_NR = props.C_NR;
  //console.log(props.C_NR);

  // --> AufrufREST Link
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?customerId=' + C_NR)
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

