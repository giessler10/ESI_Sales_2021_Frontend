import React, { Component } from 'react';
import axios from "axios";
import { Button, FormControl, Grid, TextField, Select, MenuItem, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel, IconButton, Collapse} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { GridCloseIcon } from '@material-ui/data-grid';


const useStyles = theme => ({
    root: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    error: {
        color: "red"
    },
    errorAlert: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    }
});

class newCustomerOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            O_C_NR: "",         //Kundennummer
            C_FIRSTNAME: "",    //Vorname
            C_LASTNAME: "",     //Nachname
            C_STREET: "",       //Straße
            C_HOUSENR: "",      //Hausnummer
            C_CI_PC: "",        //Postleitzahl
            CI_DESC:"",         //Stadt
            CO_ID: "",          //Länderkennung
            C_TEL: "",          //Telefon
            C_EMAIL: "",        //E-Mail
            C_COMPANY: "",      //Firma
            C_CT_ID: "",        //Kundentyp

            //Response
            response: [],
            data: null,
            menuItemCountry: [],
            radioButtonCustomerType: [],
            

            //Error
            errorMessage: null,
            errorObject: null,
            errorMessageState: false,
            errors: {},

            //Add/Remove Form
            values: [],

        };

        this.handleSubmit = this.handleSubmit.bind(this)



        //Länder laden
        axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers/countries')
        .then(
            (res) => {
                console.log(res.status);
                return res.data;
            }
        )
        .then(
            (res) => {
                this.setState({
                    menuItemCountry: res.map((v, key) => (
                        <MenuItem key={key} value={v.CO_ID}>{v.CO_DESC}</MenuItem>
                    ))
                });
            }
            
        )
        .catch(
            (error) => {
            //console.log(e);
            var errorObject = error.response.data;
            var errorMessage = errorObject.errorMessage;
            this.setState({ errorMessageState: true});
            this.setState({ errorObject: errorObject });
            this.setState({ errorMessage: errorMessage });
        });


        //CustomerTypes laden
        axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers/types')
        .then(
            (res) => {
                console.log(res.status);
                return res.data;
            }
        )
        .then(
            (res) => {
                this.setState({
                    radioButtonCustomerType: res.map((v, key) => (
                        <FormControlLabel key={key} value={v.CT_ID} control={<Radio />} label={v.CT_DESC} />
                    ))
                });
            }
        )
        .catch(
            (error) => {
            //console.log(e);
            var errorObject = error.response.data;
            var errorMessage = errorObject.errorMessage;
            this.setState({ errorMessageState: true});
            this.setState({ errorObject: errorObject });
            this.setState({ errorMessage: errorMessage });
        });
    }
  
    changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);

        //Check Form
        if(this.handleValidation()){
            console.log(this.state);
            axios
                .post(
                    "https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers",
                    this.state
                )
                .then(console.log(this.state))
                .then((res) => {
                    console.log(res.data);
                    var data = JSON.stringify(res.data);
                    data = JSON.parse(data);
                    data = data.message;
                    console.log(data);
                    return data;
                })
                .then((data) => {
                    console.log("data: " + data);
                    this.setState({ data: data });
                })
                .then((response) => {
                    console.log(response);
                })
                .then((response) => this.setState({ response }))
                .catch(
                    (error) => {
                    //console.log(e);
                    var errorObject = error.response.data;
                    var errorMessage = errorObject.errorMessage;
                    this.setState({ errorMessageState: true});
                    this.setState({ errorObject: errorObject });
                    this.setState({ errorMessage: errorMessage });
                });
        }
    };

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Vornamen prüfen
        if(this.state.C_FIRSTNAME === ""){
            formIsValid = false;
            errors["C_FIRSTNAME"] = "Vorname angeben";
        }

        //Nachnamen prüfen
        if(this.state.C_LASTNAME === ""){
            formIsValid = false;
            errors["C_LASTNAME"] = "Nachname angeben";
        }

       
        //Postleitzahl prüfen
        if(this.state.C_CI_PC === ""){
            formIsValid = false;
            errors["C_CI_PC"] = "Postleitzahl angeben";
        }
        if(this.state.C_CI_PC != ""){
            if(!this.state.C_CI_PC.match(/^[0-9]+$/)){
                formIsValid = false;
                errors["C_CI_PC"] = "Nur Zahlen erlaubt";
            }
        }


        this.setState({errors: errors});
        return formIsValid;
    };

//zeug für das add/remove button ding
addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
  }
 handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
    this.setState({ values });
 }
  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }
  handleSubmit(event) {
    alert('Eine Position wurde hinzugefügt:  ' + this.state.values.join(', '));
    event.preventDefault();
  }
createUI(){
    return this.state.values.map((el, i) => 
        <div key={i}>
<Grid item sm={12} xs={12} style={{padding: "20px", margin: "10px"}}>         
<TextField
      label="Position*"
      type="text"
      /*name="C_HOUSENR"
      value={C_HOUSENR}
      value={el||''} */
      onChange={this.handleChange.bind(this, i)}
      title="Position" />
 <TextField
      label="Menge*"
      type="text"
      /*name="OI_QTY"
        value={OI_QTY}
        value={el||''} */
        onChange={this.handleChange.bind(this, i)}
        title="Menge" /> 
    <TextField
        label="Materialbeschreibung*"
        type="text"
        /*name="OI_MATERIALDESC"
        value={OI_MATERIALDESC}
        value={el||''} */
        onChange={this.handleChange.bind(this, i)}
        title="Menge" /> 

    <TextField
        label="Farbe (Hex)*"
        type="text"
        /*name="OI_HEXCOLOR"
        value={OI_HEXCOLOR}
        value={el||''} */
        onChange={this.handleChange.bind(this, i)}
        title="Menge" /> 
    <TextField
        label="Order Item number*"
        type="text"
        /*name="OI_NR"
        value={OI_NR}
        value={el||''} */
        onChange={this.handleChange.bind(this, i)}
        title="Menge" /> 
    <TextField
        label="Preis*"
        type="text"
        /*name="OI_PRICE"
        value={OI_PRICE}
        value={el||''} */
        onChange={this.handleChange.bind(this, i)}
        title="Menge" /> 
                                    
    <TextField
        label="Bildpfad*"
        type="text"
        /*name="IM_FILE"
        value={IM_FILE}
        value={el||''} */
        onChange={this.handleChange.bind(this, i)}
        title="Bildpfad" /> 

    <TextField
        label="Bildposition*"
        type="text"
        /*name="IM_POSITION"
        value={IM_POSITION}
        value={el||''} */
        onChange={this.handleChange.bind(this, i)}
        title="Bildposition" /> 
                                             
        <Button style={{color: "#FFFFFF",
          backgroundColor: "#006064", margin:"5px", padding:"5px"}}  value='remove' onClick={this.removeClick.bind(this, i)} >
              remove
          </Button> 
    </Grid>
    </div>
    )
 }

    render() {
        //const options = {filterType: 'checkbox'};
        const { classes } = this.props;

        const {
            O_C_NR,         //Kundennummer
            C_FIRSTNAME,    //Vorname
            C_LASTNAME,     //Nachname
            C_CI_PC,        //Postleitzahl
            C_CT_ID,        //Kundentyp
            errorMessage,    //ErrorMessage
            errorMessageState //StatusErrorMessage
        } = this.state;

        let content = "";

        return (
            <div className={classes.root}>
                <form onSubmit={this.submitHandler}>
                    <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
                        <Collapse in={errorMessageState}>
                            <Alert  severity="error"
                                action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setState({ errorMessageState: false});
                                    }}
                                >
                                    <GridCloseIcon fontSize="inherit" />
                                </IconButton>
                                }
                            >
                            {errorMessage}
                            </Alert>
                        </Collapse>
                        <FormControl>
                            <Grid container spacing={4}>

                            <Grid item sm={6} xs={12}>
                                    <TextField
                                        label="Kundennummer*"
                                        type="number"
                                        name="O_C_NR"
                                        value={O_C_NR}
                                        onChange={this.changeHandler}
                                        title= "Kundennummer"/>
                                    <span className={classes.error}>{this.state.errors["O_C_NR"]}</span>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        label="Vorname*"
                                        type="text"
                                        name="C_FIRSTNAME"
                                        value={C_FIRSTNAME}
                                        onChange={this.changeHandler}
                                        title= "Vorname des Kunden"/>
                                    <span className={classes.error}>{this.state.errors["C_FIRSTNAME"]}</span>
                                </Grid>

                                    <Grid item sm={6} xs={12}>                
                                        <TextField
                                            label="Nachname*"
                                            type="text"
                                            name="C_LASTNAME"
                                            value={C_LASTNAME}
                                            onChange={this.changeHandler}
                                            title="Nachname des Kunden"/>
                                        <span className={classes.error}>{this.state.errors["C_LASTNAME"]}</span>
                                </Grid>
                
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        label="Postleitzahl*"
                                        type="number"
                                        name="C_CI_PC"
                                        value={C_CI_PC}
                                        onChange={this.changeHandler}
                                        title="Postleitzahl" />
                                    <span className={classes.error}>{this.state.errors["C_CI_PC"]}</span>
                                </Grid>


                                <Grid item sm={12} xs={12} onSubmit={this.handleSubmit} width="">
                                    <TextField
                                        label="Position*"
                                        type="text"
                                        /*name="C_HOUSENR"
                                        value={C_HOUSENR}
                                        value={el||''} */
                                        title="Position" />
                                    <TextField
                                        label="Menge*"
                                        type="text"
                                        /*name="OI_QTY"
                                        value={OI_QTY}
                                        value={el||''} */
                                        title="Menge" /> 
                                     <TextField
                                        label="Materialbeschreibung*"
                                        type="text"
                                        /*name="OI_MATERIALDESC"
                                        value={OI_MATERIALDESC}
                                        value={el||''} */
                                        title="Menge" /> 

                                    <TextField
                                        label="Farbe (Hex)*"
                                        type="text"
                                        /*name="OI_HEXCOLOR"
                                        value={OI_HEXCOLOR}
                                        value={el||''} */
                                        title="Menge" /> 
                                    <TextField
                                        label="Order Item number*"
                                        type="text"
                                        /*name="OI_NR"
                                        value={OI_NR}
                                        value={el||''} */
                                        title="Menge" /> 
                                     <TextField
                                        label="Preis*"
                                        type="text"
                                        /*name="OI_PRICE"
                                        value={OI_PRICE}
                                        value={el||''} */
                                        title="Menge" /> 
                                     <TextField
                                        label="Bild*"
                                        type="text"
                                        /*name="IM_FILE"
                                        value={IM_FILE}
                                        value={el||''} */
                                        title="Bild" /> 
                                     <TextField
                                        label="Bildposition*"
                                        type="text"
                                        /*name="IM_POSITION"
                                        value={IM_POSITION}
                                        value={el||''} */
                                        title="Bildposition" /> 
                                        <Button > 
                                        </Button>
                                        <br></br>
                                        {this.createUI()}      
                                    <Button style={{color: "#FFFFFF",
                                    backgroundColor: "#006064", padding:"5px", margin:"5px"}}  value='weitere Position' onClick={this.addClick.bind(this)} >
                                        weitere Position
                                    </Button>   
                                </Grid>
 

                                <Grid item xs={12}>                                    
                                    <Button
                                        style={{ background: "#006064", color: "#ffffff"}}
                                        type="submit"
                                        variant="contained"
                                        title="Bestellung anlegen">
                                        Bestellung anlegen
                                    </Button>                                    
                                </Grid> 

                            </Grid>
                            <div>
                                <h3>Bestätigung {(content = this.state.data)}</h3>
                            </div>
                        </FormControl>
                    </div>
                </form>
            </div>
        );
    }
}
  
export default withStyles(useStyles)(newCustomerOrder);