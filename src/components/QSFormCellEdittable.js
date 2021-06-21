import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import {Grid} from '@material-ui/core';
import axios from "axios";
import { forwardRef } from 'react';
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
import MaterialTable from "material-table";
import Alert from '@material-ui/lab/Alert';
import { Collapse } from '@material-ui/core';
import { GridCloseIcon } from '@material-ui/data-grid';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/


const tableIcons = {
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



export default function QSFormCellEdittable(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    var OI_O_NR = props.OI_O_NR;

    const { useState, useEffect } = React;
    const [data, setData] = useState([]);

    //Response
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseMessageVisible, setResponseMessageVisible] = useState(false);

    //Error,
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);

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
            initialEditValue: "19%",
            tooltip: "Mehrwertsteuer",
            editable: 'never'
        },
        {
            title: "Grund der QS",
            field: "QI_COMMENT",
            tooltip: "Grund für die QS",
            lookup: {'Keine': 'Keine', 'Falsche Farbe': 'Falsche Farbe', 'Falsche Größe': 'Falsche Größe', 'Falsches Bild': 'Falsches Bild', 'Falsche Bildplatzierung': 'Falsche Bildplatzierung', 'Falsche Ware': 'Falsche Ware', 'Beschädigt': 'Beschädigt', 'Sonstiges' : 'Sonstiges'}
        },
        { 
            title: "Gemeldete Menge", 
            field: "QI_QTY",
            type: "numeric",
        }
    ]);

    function createPostBody() {
        var dataForQS = [];
        var errorMessage = "";

        data.forEach( (currentObject, index) => {
            if(currentObject.QI_QTY != 0 && currentObject.QI_COMMENT != 'Keine'){
                if(currentObject.QI_QTY > currentObject.OI_QTY){
                    errorMessage = "Gemeldete Menge bei Position " + (index+1) + " darf nicht größer der Auftragsmenge sein!";
                    return;
                }
                else{
                    dataForQS = [...dataForQS, currentObject];
                }
            }
            else{
                if(currentObject.QI_QTY != 0 && currentObject.QI_COMMENT == 'Keine'){
                    errorMessage = "Bitte bei Position " + (index+1) + "  einen Grund angeben!";
                    return;
                }
                else if(currentObject.QI_QTY == 0 && currentObject.QI_COMMENT != 'Keine'){
                    errorMessage = "Bitte bei Position " + (index+1) + " eine Menge angeben!";
                    return;
                }

            }
        });

        if(dataForQS.length == 0 && errorMessage == ""){
            errorMessage = "Bitte für mindestens eine Position eine Menge und einen Grund angeben!";
            setErrorMessage(errorMessage);
            setErrorMessageVisible(true) 
            window.setTimeout(()=>{
                setErrorMessageVisible(false);
            },5000);
        }
        else if(errorMessage != ""){
            setErrorMessage(errorMessage);
            setErrorMessageVisible(true) 
            window.setTimeout(()=>{
                setErrorMessageVisible(false);
            },5000);
        }
        else{
            const body = dataForQS.map((element) => {
                return {
                    "QI_O_NR": OI_O_NR,
                    "QI_OI_NR": element.tableData.id + 1,
                    "QI_QTY": element.QI_QTY,
                    "QI_COMMENT": element.QI_COMMENT
                };
            });

            axios
                .post('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + OI_O_NR + '/qualityIssue', body)
                .then((res) => {
                    var data = JSON.stringify(res.data);
                    data = JSON.parse(data);
                    data = data.message;
                    return data;
                })
                .then((data) => {
                    setResponseMessage(data);
                    setResponseMessageVisible(true);
                    window.setTimeout(()=>{
                        setResponseMessageVisible(false);
                    },5000);
                })
                .then((response) => {
                })
                .catch(
                    (error) => {
                        console.log(error);
                        var errorObject = error.response.data;
                        var errorMessage = errorObject.errorMessage;
                            setErrorMessage(errorMessage);
                            setErrorMessageVisible(true) 
                            window.setTimeout(()=>{
                                setErrorMessageVisible(false);
                            },5000);
                    }
                );
        }
    }

    useEffect(() => {
        if(data != undefined){
            if(data.length == 0){
                axios
                .get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + OI_O_NR + '/orderitems')
                .then(
                    (res) => {
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
                                IM_FILE: currentObject.IM_FILE,
                                OI_QTY: currentObject.OI_QTY,
                                OI_PRICE: parseFloat(currentObject.OI_PRICE),
                                OI_VAT: '19%',
                                QI_COMMENT: 'Keine',
                                QI_QTY: 0,
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
        <div>
            <div  style={{
                paddingTop: "20px",
                margin: "20px",
                paddingLeft: '5%',
                paddingRight: '5%'
            }}>
                <Collapse className={classes.alert} in={errorMessageVisible}>
                    <Alert severity="error"
                        action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setErrorMessageVisible(false);
                            }}
                        >
                            <GridCloseIcon fontSize="inherit" />
                        </IconButton>
                        }
                    >
                    {errorMessage}
                    </Alert>
                </Collapse>
                <Collapse className={classes.alert} in={responseMessageVisible}>
                    <Alert severity="success"
                        action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setResponseMessageVisible(false);
                            }}
                        >
                            <GridCloseIcon fontSize="inherit" />
                        </IconButton>
                        }
                    >
                    {responseMessage}
                    </Alert>
                </Collapse>
            </div>
            <div className={classes.table}>
                <MaterialTable
                    style={{ marginTop: "40px", marginLeft: "20px", marginRight: "20px", '&&:hover': { color: 'red', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none', backgroundColor: 'transparent' } }}
                    title="Auftragspositionen"
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
                    title="QS erfassen"
                    >
                        QS erfassen
                    </Button>
                </Grid>
            </div>
        </div>
    );
}