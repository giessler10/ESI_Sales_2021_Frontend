import React, { Component } from 'react';
import axios from "axios";
import { Button, FormControl, Grid, TextField, Select, MenuItem, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

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

class AddCustomerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            errors: {},

        };

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

        //Straße prüfen
        if(this.state.C_STREET === ""){
            formIsValid = false;
            errors["C_STREET"] = "Straße angeben";
        }
        if(this.state.C_STREET != ""){
            if(!this.state.C_STREET.match(/^[a-zA-Z,ß]+$/)){
                console.log(this.state.C_STREET.match(/^[a-zA-Z]+$/));
                formIsValid = false;
                errors["C_STREET"] = "Nur Buchstaben erlaubt";
            }
        }

        //Hausnummer prüfen
        if(this.state.C_HOUSENR === ""){
            formIsValid = false;
            errors["C_HOUSENR"] = "Hausnummer angeben";
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

        //Stadt prüfen
        if(this.state.CI_DESC === ""){
            formIsValid = false;
            errors["CI_DESC"] = "Stadt angeben";
        }

        //Land prüfen
        if(this.state.CO_ID === ""){
            formIsValid = false;
            errors["CO_ID"] = "Land angeben";
        }

        //Telefon prüfen
        if(this.state.C_TEL === ""){
            formIsValid = false;
            errors["C_TEL"] = "Telefonnummer angeben";
        }

        //Email
        if(this.state.C_EMAIL === ""){
            formIsValid = false;
            errors["C_EMAIL"] = "E-Mail Adresse angeben";
        }
        if(this.state.C_EMAIL != ""){
            //Zeichen prüfen
            let lastAtPos = this.state.C_EMAIL.lastIndexOf('@');
            let lastDotPos = this.state.C_EMAIL.lastIndexOf('.');
    
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.C_EMAIL.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.C_EMAIL.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["C_EMAIL"] = "E-Mail Adresse ungültig";
            }
        }

        //Kundentyp prüfen
        if(this.state.C_CT_ID === ""){
            formIsValid = false;
            errors["C_CT_ID"] = "Kundentyp angeben";
        }

        //Firma prüfen
        if(this.state.C_COMPANY === "" && this.state.C_CT_ID === "B2B"){
            formIsValid = false;
            errors["C_COMPANY"] = "Firma angeben";
        }

        this.setState({errors: errors});
        return formIsValid;
    };

    render() {
        //const options = {filterType: 'checkbox'};
        const { classes } = this.props;

        const {
            C_FIRSTNAME,    //Vorname
            C_LASTNAME,     //Nachname
            C_STREET,       //Straße
            C_HOUSENR,      //Hausnummer
            C_CI_PC,        //Postleitzahl
            CI_DESC,        //Stadt
            CO_ID,          //Länderkennung
            C_TEL,          //Telefon
            C_EMAIL,        //E-Mail
            C_COMPANY,      //Firma
            C_CT_ID,        //Kundentyp
            errorMessage    //ErrorMessage
        } = this.state;

        let content = "";

        return (
            <div className={classes.root}>
                <form onSubmit={this.submitHandler}>
                    <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
                    {errorMessage && <div className={classes.errorAlert}><Alert severity="error">{errorMessage}</Alert></div>}
                        <FormControl>
                            <Grid container spacing={4}>

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
                                        label="Straße*"
                                        type="text"
                                        name="C_STREET"
                                        value={C_STREET}
                                        onChange={this.changeHandler}
                                        title="Straße" />
                                    <span className={classes.error}>{this.state.errors["C_STREET"]}</span>
                                </Grid>

                                <Grid item sm={6} xs={12}>         
                                    <TextField
                                        label="Hausnummer*"
                                        type="text"
                                        name="C_HOUSENR"
                                        value={C_HOUSENR}
                                        onChange={this.changeHandler}
                                        title="Hausnummer" />
                                    <span className={classes.error}>{this.state.errors["C_HOUSENR"]}</span>
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

                                <Grid item sm={6} xs={12}>                                    
                                    <TextField
                                        label="Stadt*"
                                        type="text"
                                        name="CI_DESC"
                                        value={CI_DESC}
                                        onChange={this.changeHandler}
                                        title="Stadt"/>
                                    <span className={classes.error}>{this.state.errors["CI_DESC"]}</span>                                   
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <FormControl>
                                        <InputLabel id="country">Land*</InputLabel>
                                        <Select
                                            name="CO_ID"
                                            value={CO_ID}
                                            onChange={this.changeHandler}
                                            style={{width:"200px"}}
                                        >
                                        {this.state.menuItemCountry}
                                        </Select>
                                        <span className={classes.error}>{this.state.errors["CO_ID"]}</span>
                                    </FormControl>
                                </Grid>    
        
                                <Grid item sm={6} xs={12}>                                    
                                    <TextField
                                        label="Telefon*"
                                        type="text"
                                        name="C_TEL"
                                        value={C_TEL}
                                        onChange={this.changeHandler}
                                        title="Telefonnummer mit Länder- und Ortsvorwahl"/>
                                    <span className={classes.error}>{this.state.errors["C_TEL"]}</span>
                                </Grid>       
        
                                <Grid item sm={6} xs={12}>                                    
                                    <TextField
                                        label="E-Mail*"
                                        type="text"
                                        name="C_EMAIL"
                                        value={C_EMAIL}
                                        onChange={this.changeHandler}
                                        title="E-Mail-Adresse des Kunden"/>
                                    <span className={classes.error}>{this.state.errors["C_EMAIL"]}</span>                                    
                                </Grid>

                                <Grid item sm={6} xs={12}>                                    
                                    <TextField
                                        label="Firma"
                                        type="text"
                                        name="C_COMPANY"
                                        value={C_COMPANY}
                                        onChange={this.changeHandler}
                                        title="Firmenname, falls vorhanden"/>
                                    <span className={classes.error}>{this.state.errors["C_COMPANY"]}</span>                                  
                                </Grid> 

                                <Grid item sm={6} xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel>Kundentyp</FormLabel>
        
                                        <RadioGroup name="C_CT_ID" value={C_CT_ID} onChange={this.changeHandler}>
                                            {this.state.radioButtonCustomerType}
                                        </RadioGroup>
                                        <span className={classes.error}>{this.state.errors["C_CT_ID"]}</span>

                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}/>
                                <Grid item xs={12}>                                    
                                    <Button
                                        style={{ background: "#006064", color: "#ffffff"}}
                                        type="submit"
                                        variant="contained"
                                        title="Kunde anlegen">
                                        Kundendetails ändern 
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
  
export default withStyles(useStyles)(AddCustomerForm);