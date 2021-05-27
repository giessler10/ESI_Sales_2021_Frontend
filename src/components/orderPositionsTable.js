import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';


export default function OrderPositionsTable(props){

  //Variables and constants  
  const [selectedData, setSelectedData] =  useState([]); 
  const [allData, setAllData] = useState([]); //alle Daten von DB.

  //Columns with properties
  const columns = [
  {name: "OI_O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: false}}, 
  {name: "OI_NR", label: "Position", options: {filter: true, sort: true, display: true }}, 
  {name: "OI_IST_NR", label: "Status", options: {filter: true,  sort: false,  display: true}}, 
  {name: "OI_MATERIALDESC", label: "Materialbeschreibung", options: {filter: true, sort: false, display: true}},  
  {name: "OI_HEXCOLOR", label: "Farbe", options: {filter: true, sort: true, display: true}}, 
  {name: "OI_QTY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
  {name: "OI_PRICE", label: "Preis", options: {filter: true, sort: true, display: true}}, 
  {name: "OI_VAT", label: "Mehrwertsteuer", options: {filter: true, sort: true, display: true}} 
  ];

  const options = { onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
  customToolbarSelect: () => {}
};

useEffect(() => {
  var OI_O_NR = props.OI_O_NR;


  // --> AufrufREST Link
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + OI_O_NR + '/orderitems')
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