import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Grid} from '@material-ui/core';

import axios from "axios";
import { forwardRef } from 'react';
import OrderHeader from './OrderHeader';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import EditIcon from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from "material-table";

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


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#006064",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textColor: "green",
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },  
  table: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%'
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function RetoureReklamationFormCellEdittable(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    var OI_O_NR = props.OI_O_NR;

    const { useState, useEffect } = React;
    const [backendResponse, setBackendResponse] = useState(null);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: "Position", 
            field: "OI_NR",
            type: "numeric",
            editable: 'never'
        },
        {
            title: "Materialbeschreibung",
            field: "OI_MATERIALDESC",
            tooltip: "Materialbeschreibung",
            lookup: { 'Weißes T-Shirt': 'Weißes T-Shirt' },
            editable: 'never'
        },
        {
            title: "Farbcode",
            field: "OI_HEXCOLOR",
            tooltip: "HEX-Code: #282C34",
           /*  cellStyle: (input, rowData) => {
                return {
                    backgroundColor: rowData?.colorCode || input,
                };
            } */
        },
        {
            title: "Farbe",
            field: "OI_HEXCOLOR",
            tooltip: "HEX-Code: #282C34",
            cellStyle: (input, rowData) => {
                return {
                    
                    backgroundColor: rowData?.colorCode || input,
                    color: 'rgba(0,0,0,0)'
                };
            },
            editable: 'never'
        },
        { 
            title: "Bild", 
            field: "IM_FILE",
            editable: 'never'
        },
        { 
            title: "Menge", 
            field: "OI_QTY",
            initialEditValue: 1,
            type: "numeric",
            editable: 'never'
        },
        {
            title: "Preis",
            field: "OI_PRICE",
            tooltip: "Einzelpreis",
            type: "currency",
            currencySetting:{ currencyCode:'EUR', minimumFractionDigits:2, maximumFractionDigits:2},
            editable: 'never'
        },
        {
            title: "Mehrwertsteuer",
            field: "OI_VAT",
            initialEditValue: 0.19,
            tooltip: "Mehrwertsteuer",
            editable: 'never'
        },
        {
            title: "Art",
            field: "IR_RT_NR",
            tooltip: "Reklamation oder Retoure",
            lookup: { 0: 'Keine', 1: 'Retoure', 2: 'Reklamation'}
        },
        {
            title: "Grund der Retoure / Reklamation",
            field: "IR_COMMENT",
            tooltip: "Grund der Retoure / Reklamation",
            lookup: {'Keine': 'Keine', 'Falsche Farbe': 'Falsche Farbe', 'Falsche Größe': 'Falsche Größe', 'Falsches Bild': 'Falsches Bild', 'Falsche Position': 'Falsche Position', 'Gefällt nicht': 'Gefällt nicht', 'Zu spät geliefert': 'Zu spät geliefert','Beschädigt': 'Beschädigt'}
        },
        { 
            title: "Gemeldete Menge", 
            field: "IR_QTY",
            type: "numeric",
        },
        {
            title: "Neuproduktion",
            field: "NewProduction",
            tooltip: "Position neu produzieren lassen?",
            lookup: { 0: 'Nein',  1: 'Ja'},
            editable: 'never'
        }
    ]);

    function createPostBody() {
        var dataForQS = [];
        var errorMessage = "";

        data.forEach( (currentObject, index) => {
            //console.log(currentObject);
            if(currentObject.IR_QTY != 0 && currentObject.IR_COMMENT != 'Keine' && currentObject.IR_RT_NR != "0"){
                if(currentObject.IR_QTY > currentObject.OI_QTY){
                    errorMessage = "Gemeldete Menge bei Position " + (index+1) + " darf nicht größer der Auftragsmenge sein!";
                    return;
                }
                else{
                    dataForQS = [...dataForQS, currentObject];
                }
            }
            else{
                if(currentObject.IR_QTY != 0 && currentObject.IR_COMMENT == 'Keine' && currentObject.IR_RT_NR != "0"){
                    errorMessage = "Bitte bei Position " + (index+1) + "  einen Grund angeben!";
                    return;
                }
                else if(currentObject.IR_QTY == 0 && currentObject.IR_COMMENT == 'Keine' && currentObject.IR_RT_NR != "0"){
                    errorMessage = "Bitte bei Position " + (index+1) + "  einen Grund und eine Menge angeben!";
                    return;
                }
                else if(currentObject.IR_QTY != 0 && currentObject.IR_COMMENT == 'Keine' && currentObject.IR_RT_NR == "0"){
                    errorMessage = "Bitte bei Position " + (index+1) + "  eine Art und eine Grund angeben!";
                    return;
                }
                else if(currentObject.IR_QTY == 0 && currentObject.IR_COMMENT != 'Keine' && currentObject.IR_RT_NR == "0"){
                    errorMessage = "Bitte bei Position " + (index+1) + "  eine Art und eine Menge angeben!";
                    return;
                }
                else if(currentObject.IR_QTY == 0 && currentObject.IR_COMMENT != 'Keine' && currentObject.IR_RT_NR != "0"){
                    errorMessage = "Bitte bei Position " + (index+1) + " eine Menge angeben!";
                    return;
                }
                else if(currentObject.IR_QTY != 0 && currentObject.IR_COMMENT != 'Keine' && currentObject.IR_RT_NR == "0"){
                    errorMessage = "Bitte bei Position " + (index+1) + " eine Art angeben!";
                    return;
                }
            }
        });

        if(dataForQS.length == 0 && errorMessage == ""){
            setBackendResponse("Bitte für mindestens eine Position eine Art, eine Menge und einen Grund angeben!");
        }
        else if(errorMessage != ""){
            setBackendResponse(errorMessage);
        }
        else{
            const body = dataForQS.map((element) => {
                return {
                    "IR_O_NR": OI_O_NR,
                    "IR_OI_NR": element.tableData.id + 1,
                    "IR_RT_NR": parseInt(element.IR_RT_NR),
                    "IR_QTY": element.IR_QTY,
                    "IR_COMMENT": element.IR_COMMENT,
                    "NewProduction": parseInt(element.NewProduction)
                };
            });

            //console.log(body);
            
            axios
                .post('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + OI_O_NR + '/itemReturn', body)
                .then((response) => {
                    setBackendResponse(response.data.message);
                })
                .catch((error) => {
                console.log(error);
                    setBackendResponse(error.message);
                })
        }
    }

    useEffect(() => {
        if(data != undefined){
            if(data.length == 0){
                axios
                .get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + OI_O_NR + '/orderitems')
                .then(
                    (res) => {
                        //console.log(res.status);

                        if(res.data.length === 0) { //Check if data is available
                            setData(undefined);
                            return;
                        } 

                        return res.data;
                    }
                )
                .then((response) => {
                        var responseArray = response;
                        var dataUpdate = [];

                        responseArray.forEach( (currentObject, index) => {
                            var newData = {
                                OI_NR: currentObject.OI_NR,
                                OI_MATERIALDESC: currentObject.OI_MATERIALDESC,
                                OI_HEXCOLOR: currentObject.OI_HEXCOLOR,
                                IM_FILE: "Muss in der Lambda noch erweitert werden",
                                OI_QTY: currentObject.OI_QTY,
                                OI_PRICE: parseFloat(currentObject.OI_PRICE),
                                OI_VAT: parseFloat(currentObject.OI_VAT),
                                IR_RT_NR: "0",
                                IR_COMMENT: 'Keine',
                                IR_QTY: 0,
                                NewProduction: "0",
                                tableData: {
                                    id: index
                                }
                            }
                            dataUpdate = [...dataUpdate, newData];
                        });

                        setData([...dataUpdate]);
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    }, [data]);

    return (
        <div className={classes.table}>
            <MaterialTable
                style={{ marginTop: "40px", marginLeft: "20px", marginRight: "20px", '&&:hover': { color: 'red', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none', backgroundColor: 'transparent' } }}
                title="Positionen"
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
                cellEditable={{
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                        return new Promise((resolve, reject) => {
                            //console.log('newValue: ' + newValue);
                            const dataUpdate = [...data]
                            const rowDataUpdate = rowData;
                            const columnField = columnDef.field;
                            rowDataUpdate[columnField] = newValue;
                            const index = rowData.tableData.id;
                            dataUpdate[index] = rowDataUpdate;
                            setData([...dataUpdate]);
                            setTimeout(resolve, 1000);
                        });
                    }
                }}
            />
            <Grid item xs={12}>
        
                <Button
                onClick={createPostBody}
                style={{ float: "right", margin: "20px" }}
                variant="outlined"
                color="primary"
                title="Bestellung speichern"
                >
                    Reklamation und Retoure erfassen
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
        </div>
    );
}