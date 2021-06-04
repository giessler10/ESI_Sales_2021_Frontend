import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import QualityCell from'./QualityCell';


export default function OrderPositionsTable(props){

  //Variables and constants  
  const [selectedData, setSelectedData] =  useState([]); 
  const [allData, setAllData] = useState([]); //alle Daten von DB.

  //Columns with properties
  const columns = [
  {name: "OI_O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: false}}, 
  {name: "OI_NR", label: "Position", options: {filter: true, sort: true, display: true }}, 
  {name: "IST_DESC", label: "Status", options: {filter: true,  sort: false,  display: true}}, 
  {name: "OI_MATERIALDESC", label: "Materialbeschreibung", options: {filter: true, sort: false, display: true}},  
  {name: "OI_HEXCOLOR", label: "Farbwert", options: {filter: true, sort: true, display: true}},
  {name: "OI_HEXCOLOR", label: "Farbe", options: {filter: true,sort: true, display: true, 
    customBodyRender: (value, tableMeta, updateValue) => {
      return (
        <QualityCell
          value={value}
          index={tableMeta.columnIndex}
          change={event => updateValue(event)}
        />
      );}}},
  {name: "OI_QTY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
  {name: "OI_PRICE", label: "Preis", options: {filter: true, sort: true, display: true}}, 
  {name: "OI_VAT", label: "Mehrwertsteuer", options: {filter: true, sort: true, display: true}} 
  ];

  const options = { onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
  customToolbarSelect: () => {},
    textLabels: {
      body: {
        noMatch: "Es wurden keine passenden Aufträge gefunden.",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      }
    }
  };

  useEffect(() => {
    var OI_O_NR = props.OI_O_NR;
    if(allData != undefined){
      if(allData.length == 0){
      // --> AufrufREST Link
      axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + OI_O_NR + '/orderitems')
          .then(res => {
            //console.log(res);
            if(res.data.length === 0) { //Check if data is available
              setAllData(undefined);
              return;
            } 
  
            setAllData(res.data); //Set new table data
            return res.data;

          })
          .catch( error => {
            var errorObject = error.response.data;
            var errorMessage = errorObject.errorMessage;
            console.log(errorMessage); //Error-Handling
          })
    }
    }
  }, [allData]);


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