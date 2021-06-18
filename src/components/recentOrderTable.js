import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from "axios";
import FullScreenDialogOrderDetails from'./FullScreenDialogOrderDetails';

export default function RecentOrders(){

  //Define Constants
  const [allData, setAllData] = useState([]); //alle Daten von DB.
  const [filteredData, setfilteredData] = useState([]); //alle Daten von DB.
  const [selectedData, setSelectedData] =  useState([]); 

  const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
  {name: "O_C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: true }}, 
  {name: "O_OST_NR", label: "Auftragsstatus-Nr", options: {filter: true, sort: false, display: false}},  
  {name: "O_TIMESTAMP_FORMAT", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
  {name: "OST_DESC", label: "Auftragsstatus", options: {filter: true, sort: true, display: true}}, 
  {name: "C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: true}}, 
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
  {name: "CT_DESC", label: "Kundenart", options: {filter: true, sort: true, display: true}}];


  useEffect(() => {
    //Orders aus MySQL ziehen
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders')
        .then(res => {       
        
          setAllData(res.data); //Set new table data
        
          var last7Days=new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString(); // Set on the last 7 days // <- That one here is starting "useEffect" every second again - If not it would work properly -> Maybe kill useEffect() if possible
          //var last7Days = "2021-05-26T00:00:00.000Z"
          //Set filters for 'recently' inserted Orders
          var filtereddata= res.data.filter(function(obj) { return obj.O_TIMESTAMP >= last7Days;});    

          setfilteredData(filtereddata); //Set new table data      

                  
        })
        .catch(err => {
            console.log(err.message); //Error-Handling
        })
  }, []);


  const options = {filterType: 'checkbox', onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
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
    },
    selectableRows: 'single'
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
  };
  
  return (
    <div>
    <MuiThemeProvider theme={getMuiTheme()} > 
      <MUIDataTable
        data={filteredData}
        columns={columns}
        options={options}/>
        <br></br>
    </MuiThemeProvider>

    </div>
  );            
}
    