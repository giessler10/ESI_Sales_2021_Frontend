
import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import axios from "axios";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import FullScreenQSDialog from '../components/FullScreenQSDialog';
import ShippingButton from '../components/ShippingButton'


export default function ShippingOrders(){

//Variables and constants 
var logoBase64 = require('../img/logoBase64.js');

const [selectedData, setSelectedData] =  useState([]); 
const [allData, setAllData] = useState([]); //alle Daten von DB.

//Columns with properties
const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
{name: "O_C_NR", label: "Kunden-Nr", options: {filter: true, sort: true, display: false }}, 
{name: "O_OT_NR", label: "Auftragsart-Nr", options: {filter: true,  sort: false,  display: false}}, 
{name: "O_OST_NR", label: "Auftragsstatus-Nr", options: {filter: true, sort: false, display: false}},  
{name: "O_TIMESTAMP", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
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
 customToolbarSelect: (selectedRows) => {return <div> 
    <React.Fragment>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button disabled={MoreThan2Rows()} variant="outlined" color="primary" onClick={CreateDelivOrder}> <DescriptionIcon/>Lieferschein</Button> 
        <FullScreenQSDialog selectedRows={selectedRows.data}/> 
        <ShippingButton/>
      </Grid>
    </React.Fragment>
  </div>;},


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
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?status=7')
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


function MoreThan2Rows(){
  if(selectedData.length > 1) 
    {return true;}
    return false;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function PdfCreate(OrderitemsData,logoBase64){

  console.log("Orderitemdata Länge:", OrderitemsData.length);

  var tableData = Array.from(Array(OrderitemsData.length), (item, index)=>({

    num: String(OrderitemsData[index]["OI_NR"]),
    desc: String(OrderitemsData[index]["OI_MATERIALDESC"]),
    price: String(parseFloat(OrderitemsData[index]["OI_PRICE"]/OrderitemsData[index]["OI_QTY"]).toFixed(2)),
    quantity: String(OrderitemsData[index]["OI_QTY"]),
    unit: String(OrderitemsData[index]["OI_PRICE"]),
    total: String(parseFloat((OrderitemsData[index]["OI_PRICE"]*(1+parseFloat(OrderitemsData[index]["OI_VAT"]))).toFixed(2))),
    order_num: String(OrderitemsData[index]["O_NR"]),
}));

console.log("TableData", tableData);

                //Getting invoicedate
                var invoicedate = new Date();
                var dd = String(invoicedate.getDate()).padStart(2, '0');
                var mm = String(invoicedate.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = invoicedate.getFullYear();
                var orderNumber = "Lieferschein",order_num;

                invoicedate = dd + '.' + mm + '.' + yyyy;

                //Getting paymentdate
                var paymentdate = new Date();
                paymentdate.setDate(paymentdate.getDate() + 14);

                var dd = String(paymentdate.getDate()).padStart(2, '0');
                var mm = String(paymentdate.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = paymentdate.getFullYear();

                paymentdate = dd + '.' + mm + '.' + yyyy;

var props = {
  outputType: OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: orderNumber,
  orientationLandscape: false,
  logo: {
      //src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
      src: logoBase64,
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
      }
  },
  business: {
      name: "YourShirt GmbH",
      address: "Schutterlindenberg 66, (DE) 77933 Lahr",
      phone: "(+49) 7821 66 66 66",
      email: "info@yourshirt.com",
      //email_1: "info@example.al",
      website: "www.yourshirt.de",
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
      invDate: "Payment Date: " + invoicedate,
      invGenDate: "Invoice Date: " + paymentdate,
      header: ["#", "Description", "Price per Piece", "Quantity", "Price net","Price gross"],
      headerBorder: false,
      tableBodyBorder: false,
      table: tableData,
      invTotal: "145,250.50",
      invCurrency: "EUR",
      row1: {
          col1: 'VAT:',
          col2: '19',
          col3: '%',
          style: {
              fontSize: 10 //optional, default 12
          }
      },
      row2: {
          col1: 'SubTotal:',
          col2: '116,199.90',
          col3: 'EUR',
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

 //Lieferschein Button Click 
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
        PdfCreate(res.data,logoBase64.src);
      
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
