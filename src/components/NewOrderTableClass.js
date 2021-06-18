import React, { Component, useState } from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, Grid, TextField, Radio, RadioGroup, FormLabel, Button, IconButton, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { GridCloseIcon } from '@material-ui/data-grid';

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
import { Autocomplete } from '@material-ui/lab';
import ColorHead from "./mostUsedColorHead";



const useStyles = theme => ({
    root: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    error: {
        color: "red"
    },
    greyed: {
         color: "red"
    },
    alert: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        paddingBottom: "30px"
    },
    FormControlLabel: {
        color: "grey"
    }
});

var colorDisabled ="#006064";

//function changeColor(color){

//var radioJa = document.getElementById("radioJa"); //Entwurf JA
//var radioNein = document.getElementById("radioNein"); //Entwurf NEIN
//var labelEntwurf = document.getElementById("LabelEntwurf"); //Überschrift Entwurf
//var labelKundennummer = document.getElementById("labelKundennummer"); //Überschrift Kundennummer

//if(radioJa === null || radioJa === undefined) return;
//if(radioNein === null || radioNein === undefined) return;
//if(labelEntwurf === null || labelEntwurf === undefined) return;
//if(labelKundennummer === null || labelKundennummer === undefined) return;

//radioJa.style.color = color;
//radioNein.style.color = color;
//labelEntwurf.style.color = color;
//labelKundennummer.style.color = color;

   
//}

function changeColor(e){
    if(e == 1){
        colorDisabled ="#EBEBE4";
        return colorDisabled;
    }

    if(e == 2){
        colorDisabled ="#006064";
        return colorDisabled;
    }

    return  colorDisabled ="#006064";
    
}


function preProdDisabled(val)
{ 
    //wenn 1 dann vorproduktion
    if(val==="1"){
        //<div>className={useStyles.greyed}</div>

        return true;
    }
    else{
        return false;
    }

};

function btnAddOrderDisabled(anzOrderitems){ 
    //Wenn keine Position angelegt ist Btn ausblenden
    //var anzOrderitems = this.state.data;
    if(anzOrderitems.length == 0){
        return true;
    }
    else{
        return false;
    }

};

class NewOrderTableClass extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            
            data: [],
            columns: [
                {
                    title: "Materialbeschreibung",
                    field: "OI_MATERIALDESC",
                    tooltip: "Materialbeschreibung",
                    lookup: { 'Weißes T-Shirt': 'Weißes T-Shirt' }
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
                    title: "Bildname", 
                    field: "IM_FILE"
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
                    currencySetting:{ 
                        currencyCode: 'EUR',
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2
                    }
                },
                {
                    title: "Mehrwertsteuer",
                    field: "OI_VAT",
                    initialEditValue: "19%",
                    tooltip: "Mehrwertsteuer",
                    editable: 'never'
                }
            ],

            columnsPreproduction: [
                {
                    title: "Materialbeschreibung",
                    field: "OI_MATERIALDESC",
                    tooltip: "Materialbeschreibung",
                    lookup: { 'Weißes T-Shirt': 'Weißes T-Shirt' }
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
                    title: "Bildname", 
                    field: "IM_FILE",
                    editable: 'never',
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
                    currencySetting:{ 
                        currencyCode: 'EUR',
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2
                    }
                },
                {
                    title: "Mehrwertsteuer",
                    field: "OI_VAT",
                    initialEditValue: "19%",
                    tooltip: "Mehrwertsteuer",
                    editable: 'never'
                }
            ],

            tableIcons: {
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
            },

            O_OT_NR: "2",     //Ordertype default 2
            draft: "0",       //Entwurf
            C_NR: 0,        //Kundennummer

            values: null,

            //Response
            response: [],
            responseMessage: null,
            responseMessageVisible: false,

            //Error,
            errorMessage: null,
            errorMessageVisible: false,
            errorObject: null,

            customers: [],
            errors: {}
        };

        //Customers laden
        axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers')
        .then(
            (res) => {
                //console.log(res.status);
                return res.data;
            }
        )
        .then(
            (res) => {
                var customers = [];
                res.forEach((currentCustomer, index) => {
                    var customer = {
                        C_DESC: currentCustomer.C_DESC,
                        C_NR: currentCustomer.C_NR
                    }
                    customers.push(customer);
                });
                this.setState({customers: customers});
            }
        )
        .catch(
            (error) => {
                //console.log(error);
                var errorObject = error.response.data;
                var errorMessage = errorObject.errorMessage;
                this.setState({ 
                    errorObject: errorObject,
                    errorMessage: errorMessage 
                });
                this.setState({ errorMessageVisible: true},()=>{ 
                        window.setTimeout(()=>{
                            this.setState({errorMessageVisible: false})
                        },5000);
                    }
                )
            }
        );
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createOrderitems = () => {
        if(this.handleValidation()){
            var orderitems;
            var body;

            if(this.state.O_OT_NR == "1"){
                //this.setState({C_NR: 0});

                orderitems = this.state.data.map((element) => {
                    return {
                        "OI_NR": element.tableData.id + 1,
                        "OI_MATERIALDESC": element.OI_MATERIALDESC,
                        "OI_HEXCOLOR": element.OI_HEXCOLOR,
                        "OI_QTY": element.OI_QTY,
                        "IM_FILE": element.IM_FILE != undefined ? "P:/images/" + this.state.C_NR + "/" + element.IM_FILE : "",
                        "OI_PRICE": element.OI_PRICE,
                        "OI_VAT": 0.19  //Mehrwersteuersatz 19%
                    };
                });

                body = {
                    C_NR: 0,        //Default 0
                    draft: false,   //Default false
                    orderitems: orderitems
                }

            }
            else{
                orderitems = this.state.data.map((element) => {
                    return {
                        "OI_NR": element.tableData.id + 1,
                        "OI_MATERIALDESC": element.OI_MATERIALDESC,
                        "OI_HEXCOLOR": element.OI_HEXCOLOR,
                        "OI_QTY": element.OI_QTY,
                        "IM_FILE": element.IM_FILE != undefined ? "P:/images/" + this.state.C_NR + "/" + element.IM_FILE : "",
                        "OI_PRICE": element.OI_PRICE,
                        "OI_VAT": 0.19  //Mehrwersteuersatz 19%
                    };
                });

                body = {
                    C_NR: parseInt(this.state.C_NR),
                    draft: this.valueToBoolean(this.state.draft),
                    orderitems: orderitems
                }
            }

            body = JSON.stringify(body);

            console.log(body);
            
            axios
                .post(
                    "https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders", body
                )
                .then((res) => {
                    //console.log(res.data);
                    var data = JSON.stringify(res.data);
                    data = JSON.parse(data);
                    data = data.message;
                    //console.log(data);
                    return data;
                })
                .then((data) => {
                    //console.log("responseMessage: " + data);
                    this.setState({ responseMessage: data });
                    this.setState({ responseMessageVisible: true },()=>{ 
                        window.setTimeout(()=>{
                            this.setState({responseMessageVisible: false})
                        },6000);
                    });
                    return data;
                })
                .then((data) => {
                    //Reset State möglich
                    this.resetStateInputData();
                })
                .catch(
                    (error) => {
                        //console.log(error);
                        var errorObject = error.response.data;
                        var errorMessage = errorObject.errorMessage;
                        this.setState({ 
                            errorObject: errorObject,
                            errorMessage: errorMessage 
                        });
                        this.setState({ errorMessageVisible: true},()=>{ 
                                window.setTimeout(()=>{
                                    this.setState({errorMessageVisible: false})
                                },6000);
                            }
                        )
                    }
                );
        }
    };

    resetStateInputData(){ 
        this.setState({ 
            data: [],
            O_OT_NR: "2",     //Ordertype default 2
            draft: "0",       //Entwurf
            C_NR: 0,         //Kundennummer
            values: null
        });

        changeColor(2);
    };

    handleValidation() {
        let errors = {};
        let formIsValid = true;    

        if(this.state.O_OT_NR == "2"){
            //Kundennummer prüfen
            if(this.state.C_NR == 0){
                formIsValid = false;
                errors["C_NR"] = "Kundennummer angeben";
            }
        
        this.setState({errors: errors});
        return formIsValid;
        }
        else{
            return formIsValid;
        }
    };


    valueToBoolean = (value) => {
        if(value == 0){
            return true;
        }
        else{
            return false;
        }
    };



    render() {
        const { classes } = this.props;

        const {
            data,
            columns,
            columnsPreproduction,
            tableIcons,

            //UI-Elements
            O_OT_NR,
            draft,
            C_NR,
            values,

            errorMessage,           //ErrorMessage
            errorMessageVisible,    //StatusErrorMessage
            responseMessage,        //ResponseMessage
            responseMessageVisible,  //ReponseMessageStatus

            errors

  
        } = this.state;

        return (
            <div style={{ maxWidth: '100%' }}>
                <Collapse className={classes.alert} in={errorMessageVisible}>
                    <Alert severity="error"
                        action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                this.setState({ errorMessageVisible: false});
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
                                this.setState({ responseMessageVisible: false});
                            }}
                        >
                            <GridCloseIcon fontSize="inherit" />
                        </IconButton>
                        }
                    >
                    {responseMessage}
                    </Alert>
                </Collapse>
                
                <div id="divTest" style={{ maxWidth: "100%", display: "flex", paddingTop: "10px", margin: "20px"}}>
                    <Grid container spacing={3} align="left">
                        <Grid container spacing={3} align="center">
                            <Grid item xs={3}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend"> <b style={{color: "#006064"}}>Auftragstyp *</b><br /></FormLabel>
                                    <RadioGroup aria-label="orderType" name="O_OT_NR" value={O_OT_NR} onChange={this.changeHandler}>
                                        <FormControlLabel key="0" value="1" onChange={e => changeColor(e.target.value)}  control={<Radio style={{color: "#006064"}} />} label="Vorproduktion" />
                                        <FormControlLabel key="1" value="2" onChange={e => changeColor(e.target.value)} control={<Radio style={{color: "#006064"}}/>} label="Normal" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid className="GridEntwurf" name="gridEntwurf" item xs={3} style={{color: "#006064"}}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend"  > <b  style={{color: "#006064"}} id="LabelEntwurf"  name="formlabel1">Als Entwurf speichern? *</b></FormLabel>
                                    <RadioGroup aria-label="draft" name="draft" value={draft} onChange={this.changeHandler} >
                                        <FormControlLabel  className={classes.FormControlLabel} key="1" value="0" id="radioJa" disabled={preProdDisabled(O_OT_NR)} control={<Radio  style={{color: colorDisabled}}    />} label="Ja" />
                                        <FormControlLabel className={classes.FormControlLabel} key="0" value="1" id="radioNein" disabled={preProdDisabled(O_OT_NR)} control={<Radio  style={{color: colorDisabled}}/>} label="Nein" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        
                            <Grid item xs={6} align="left">  
                            <b style={{color: "#006064"}} id="LabelKundennummer">Kundennummer</b>                                  
                                <Autocomplete
                                    //disabled={preProdDisabled(O_OT_NR)}
                                    id="combo-box-Customer"
                                    options={this.state.customers}
                                    value={this.state.values}
                                    getOptionLabel={(option) => option.C_DESC}
                                    style={{ width: "650px" }}
                                    renderInput={(params) => <TextField {...params} label="" variant="outlined"/>}
                                    onChange={(event, value) => {
                                            if(value != null){
                                                this.setState({ values: value });
                                                this.setState({ C_NR: value.C_NR });
                                            }
                                            else{
                                                this.setState({ values: value });
                                                this.setState({ C_NR: 0 });
                                            }
                                        }
                                    }
                                />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_NR"] }</span>
                                </div>
                            </Grid>
                            
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                                <ColorHead></ColorHead>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <MaterialTable
                                localization={{
                                    toolbar: {
                                        body: {
                                            emptyDataSourceMessage: 'Keine Aufträge vorhanden.'
                                        }
                                    }
                                }}
                                style={{ marginTop: "40px", marginLeft: "20px", marginRight: "20px", '&&:hover': { color: 'red', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none', backgroundColor: 'transparent' }}}
                                title="Editable Preview"
                                columns={values != null ? columns : columnsPreproduction}
                                data={data}
                                title="Auftragspositionen"
                                icons={tableIcons}
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
                                editable={{
                                    onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                        this.setState({data: [...data, newData]});

                                        resolve();
                                        }, 1000)
                                    }),
                                    onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        this.setState({data: [...dataUpdate]});

                                        resolve();
                                        }, 1000)
                                    }),
                                    onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        this.setState({data: [...dataDelete]});
                                        
                                        resolve()
                                        }, 1000)
                                    }),
                                }}
                            />
                        </Grid>

                            

                        <Grid item xs={12}>
                            <Button
                                disabled={btnAddOrderDisabled(this.state.data)}
                                onClick={this.createOrderitems}
                                style={{ float: "right", margin: "20px" }}
                                variant="outlined"
                                color="primary"
                                type="submit"
                                title="Auftrag anlegen"
                            >
                                Auftrag anlegen
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>    
        )
    }
}

export default withStyles(useStyles)(NewOrderTableClass);