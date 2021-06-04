import React from "react";
import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    //Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Add: props => {
        return (<Button variant="outlined" color="primary"> Position hinzufügen </Button>);
    },
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  

export default function Editable() {
    const { useState } = React;
    const [count, incrementCount] = useState(1);
    const [C_NR, setCustomerId] = useState("");
    const [asDraft, setasDraft] = useState(false);
    const [O_OT_NR, setOderType] = useState();
    const [data, setData] = useState([]);
    const [backendResponse, setBackendResponse] = useState(null);
    const [columns, setColumns] = useState([
        /*
        {
            title: "Position",
            field: "OI_NR",
            initialEditValue: count,
            tooltip: "Position",
            editable: 'never'
        },
        */
        {
            title: "Materialbeschreibung",
            field: "OI_MATERIALDESC",
            tooltip: "Materialbeschreibung",
            lookup: { 'Weißes T-Shirt': 'Weißes T-Shirt' },
        },
        {
            title: "Farbcode",
            field: "OI_HEXCOLOR",
            tooltip: "HEX-Code: #282C34",
            cellStyle: (input, rowData) => {
                return {
                    backgroundColor: rowData?.colorCode || input,
                };
            },
        },
        {
          title: "Farbe",
          field: "OI_HEXCOLOR",
          tooltip: "HEX-Code: #282C34",
          cellStyle: (input, rowData) => {
              return {
                  backgroundColor: rowData?.colorCode || input
              };
          },
      },
        { 
            title: "Bild", 
            field: "IM_FILE", 
        },
        { 
            title: "Menge", 
            field: "OI_QTY",
            initialEditValue: 1,
            type: "numeric" 
        },
        {
            title: "Preis",
            field: "OI_PRICE",
            tooltip: "Einzelpreis",
            type: "currency",
            currencySetting:{ currencyCode:'EUR', minimumFractionDigits:2, maximumFractionDigits:2}
        },
        {
            title: "Mehrwertsteuer",
            field: "OI_VAT",
            initialEditValue: 0.19,
            tooltip: "Mehrwertsteuer",
            editable: 'never'
        }
    ]);
  

    const theme = createMuiTheme({
      palette: {
        primary: { main: '#11cb5f' }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
      },
    });

    function createOrderitems() {
        console.log(
            data.map((element) => {
                return {
                    "OI_NR": parseInt(element.tableData.id + 1 + ""),
                    "OI_MATERIALDESC": element.OI_MATERIALDESC,
                    "OI_HEXCOLOR": element.OI_HEXCOLOR,
                    "OI_QTY": parseInt(element.OI_QTY),
                    "IM_FILE": element.IM_FILE,
                    "OI_PRICE": parseFloat(element.OI_PRICE),
                    "OI_VAT": parseFloat(element.OI_VAT)
                };
            })
        );
        const orderitems = data.map((element) => {
            return {
                "OI_NR": parseInt(element.tableData.id + 1 + ""),
                "OI_MATERIALDESC": element.OI_MATERIALDESC,
                "OI_HEXCOLOR": element.OI_HEXCOLOR,
                "OI_QTY": parseInt(element.OI_QTY),
                "IM_FILE": element.IM_FILE,
                "OI_PRICE": parseFloat(element.OI_PRICE),
                "OI_VAT": parseFloat(element.OI_VAT)
            };
        });
    
        var body = {
            C_NR: parseInt(C_NR),
            O_OT_NR: parseInt(O_OT_NR),
            draft: stringToBoolean(asDraft),
            orderitems: orderitems
        }

        body = JSON.stringify(body);
        console.log(body);

        axios
            .post(
                "https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders", body
            )
            .then(console.log(body))
            .then((response) => {
                setBackendResponse(response.data.message);
            })
            .catch((error) => {
            console.log(error);
                setBackendResponse(error.message);
            })
    }

    function stringToBoolean(string){
        switch(string.toLowerCase().trim()){
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(string);
        }
    }

    //let content = "";

  
    return (
      <>
        <div style={{ maxWidth: "100%", display: "flex",
        paddingTop: "10px",
        margin: "20px"}} >
        <Grid container spacing={3} align="left">
          <Grid item xs></Grid>
            <Grid item xs style={{alignContent:"left"}}>
              <div
                style={{ paddingLeft: "20px"}}
                onChange={(e) => setOderType(e.target.value)}>
                <b style={{color: "#006064"}}>Auftragstyp *</b><br />
                <input
                style={{color: "black"}}
                  type="radio"
                  value={1}
                  name="O_OT_NR"/> Vorproduktion <br/>
                <input 
                defaultChecked
                  type="radio" 
                  value={2} 
                  name="O_OT_NR" /> Normal <br />
              </div>
            </Grid>
          <Grid item xs>
            <div
              style={{ paddingLeft: "20px"}}
              onChange={(e) => setasDraft(e.target.value)}>
            <b >Als Entwurf speichern? *</b>  <br />
            <input
                defaultChecked
                color="secondary"
                type="radio"
                value={true}
                name="asDraft"/> Ja <br/>
              <input
                type="radio" 
                value={false} 
                name="asDraft" /> Nein <br />
            </div>
          </Grid>

          <Grid item xs>
            <form noValidate autoComplete="off">
                          <TextField
                            color="#ffffff"
                            id="outlined-basic"
                            label="Kundennummer"
                            value={C_NR}
                            onChange={(e) => setCustomerId(e.target.value)}
                            title="Die Angabe einer Kundennummer ist nur für Bestellungen notwendig, die nicht auf Lager produziert werden."
                          />
                          </form>{" "}
                        <br />
            </Grid>
          <Grid item xs></Grid>

            <Grid item xs={12}>

          <MaterialTable
            style={{ marginTop: "40px", marginLeft: "20px", marginRight: "20px", '&&:hover': { color: 'red', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none', backgroundColor: 'transparent' } }}
            title="Auftrag anlegen"
            columns={columns}
            data={data}
            options={{
              headerStyle: {
                backgroundColor: "#006064",
                color: "#FFFF",
              },
            textLabels: {
              body: {
                noMatch: "Es wurden keine passenden Aufträge gefunden.",
                toolTip: "Sort",
                columnHeaderTooltip: column => `Sort for ${column.label}`
              }
            }
            }}
            icons={tableIcons}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    incrementCount(count + 1);
                    setData([...data, newData]);
                    console.log(count, newData);
  
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
  
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
  
                    resolve();
                  }, 1000);
                }),
            }}
          />
          </Grid>
          <Grid item xs={12}>
        
        <Button
          onClick={createOrderitems}
          style={{ float: "right", margin: "20px" }}
          variant="outlined"
          color="primary"
          title="Bestellung speichern"
        >
          Bestellung speichern
        </Button>
        </Grid>
        <Grid item xs={12}>
        <div style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
              margin: "20px",
            }}>
          <h3>Bestätigung: {backendResponse}</h3>
        </div>
       </Grid>
       </Grid>
       </div>
         
</>
    );
  }