import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from "axios";

export default function RecentOrders(){

//Define Constants
const [allData, setAllData] = useState([]); //alle Daten von DB.
const [filteredData, setfilteredData] = useState([]); //alle Daten von DB.

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


useEffect(() => {
  //Orders aus MySQL ziehen
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders')
      .then(res => {
      console.log("Response Orderlist:", res); //Data from Gateway
      
      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.length === 0) { //Check if data is available
        setAllData(undefined);
        return;
      }          

      if (DataAreEqual(allData, res.data)) return; //Check if data has changed       
      
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
});


const options ={
textLabels: {
  body: {
    noMatch: "Es wurden keine passenden Aufträge gefunden.",
    toolTip: "Sort",
    columnHeaderTooltip: column => `Sort for ${column.label}`
  }
}
};

    //Check if old data = new data
    function DataAreEqual(data, sortedOrders){
      if(data.sort().join(',') === sortedOrders.sort().join(',')){
        return true;
        }
        else return false;
      }

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
            data={filteredData}
            columns={columns}
            options={options}/>
            <br></br>
        </MuiThemeProvider>
    
       </div>
   );            
  }
    