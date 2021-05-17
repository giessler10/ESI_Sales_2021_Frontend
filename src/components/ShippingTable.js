import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import axios from "axios";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import yourshirt from '../img/android-chrome-144x144.png';


export default function ShippingOrders(){

//Variables and constants  
const [selectedData, setSelectedData] =  useState([]); 
const [allData, setAllData] = useState([]); //alle Daten von DB.

//Columns with properties --> TODO auf eure Spaltennamen anpassen
const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
{name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true }}, 
{name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
{name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
{name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
{name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
{name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
{name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
{name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: true}}, 
{name: "C", label: "C", options: {filter: true, sort: false, display: false}},
{name: "M", label: "M",options: {filter: true,sort: false,display: false}},
{name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
{name: "K", label: "K", options: {filter: true,sort: false, display: false}},
{name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true}},
{name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: true}},
{name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
{name: "END_DATE",label: "END_DATE",options: {filter: true,sort: false, display: false}},
{name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}}];


/* //TesttabelleI Aufbau
const columnsShippingOrders =  ["Order No.", "Customer No.", "Postcode", "Date", "Order State"];
const dataShippingOrders = [
    ["1", "37", "88739", "15/2/2020", "Ready"],
    ["31", "232", "22131", "19/1/2020", "Ready"],
    ["122", "2441", "33245", "1/8/2019", "Ready"],
    ["123", "23", "77883", "18/2/2021", "Ready"],
]; */

 const options = { onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected);},
 customToolbarSelect: () => {return  <Button variant="contained" onClick={CreateDelivOrder}> <DescriptionIcon/>Lieferschein</Button>;}};

 useEffect(() => {
  // --> TODO  eurem REST Link einfügen
  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders')
      .then(res => {
      console.log("RESPONSE:", res); //Data from Gateway
      
      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setAllData(undefined);
        return;
      }          

      if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
      setAllData(res.data.body); //Set new table data

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
 function CreateDelivOrder(){

  /* if(selectedData.length > 1) {
    alert("Bitte nur ein Datensatz auswählen");
    return;
  }
 */
  
  var tableData = Array.from(Array(selectedData.length), (item, index)=>({
    num: String(selectedData[index]["O_NR"]),
    desc: String(selectedData[index]["OI_NR"]),
    price: String(selectedData[index]["PO_CODE"]),
    quantity: String(selectedData[index]["PO_COUNTER"]),
    unit: String(selectedData[index]["O_NR"]),
    total: String(selectedData[index]["O_NR"])
}));


console.log("TableData", tableData);

  var props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Lieferschein",
    orientationLandscape: false,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        name: "Business Name",
        address: "Albania, Tirane ish-Dogana, Durres 2001",
        phone: "(+355) 069 11 11 111",
        email: "email@example.com",
        email_1: "info@example.al",
        website: "www.example.al",
    },
    contact: {
        label: "Invoice issued for:",
        name: "Client Name",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
    },
    invoice: {
        label: "Invoice #: ",
        invTotalLabel: "Total:",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        header: ["#", "Description", "Price", "Quantity", "Unit", "Unit1"],
        headerBorder: false,
        tableBodyBorder: false,
        table: tableData,
        invTotal: "145,250.50",
        invCurrency: "ALL",
        row1: {
            col1: 'VAT:',
            col2: '20',
            col3: '%',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        row2: {
            col1: 'SubTotal:',
            col2: '116,199.90',
            col3: 'ALL',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};

 const pdfObject = jsPDFInvoiceTemplate(props);

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