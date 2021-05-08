import React, { Component } from 'react';
import axios from "axios";
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
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
        CO_DESC: "",        //Land
        C_TEL: "",          //Telefon
        C_EMAIL: "",        //E-Mail
        C_COMPANY: "",      //Firma

        //Response
        response: [],
        data: null,
      };
    }
  
    changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      /*
      if (e.target.value === "false") {
        this.setState({ business: false });
        return this.business;
      } else if (e.target.value === "true") {
        this.setState({ business: true });
        return this.business;
      }
      */
    };
  
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios
            .post(
                "https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers/newCustomer",
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
            .catch((error) => {
                console.log(error);
            });
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
            CO_DESC,        //Land
            C_TEL,          //Telefon
            C_EMAIL,        //E-Mail
            C_COMPANY,      //Firma
        } = this.state;

        let content = "";
  
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
                        <FormControl>
                            <Grid container spacing={4}>
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}>
                                        <TextField
                                            label="Vorname*"
                                            type="text"
                                            name="C_FIRSTNAME"
                                            value={C_FIRSTNAME}
                                            onChange={this.changeHandler}
                                            title= "Vorname des Kunden"/>
                                    </Paper>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}>                        
                                        <TextField
                                            label="Nachname*"
                                            type="text"
                                            name="C_LASTNAME"
                                            value={C_LASTNAME}
                                            onChange={this.changeHandler}
                                            title="Nachname des Kunden"/>
                                    </Paper>
                                </Grid>
                
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}>            
                                        <TextField
                                            label="Straße*"
                                            type="text"
                                            name="C_STREET"
                                            value={C_STREET}
                                            onChange={this.changeHandler}
                                            title="Straße" />
                                    </Paper>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}>            
                                        <TextField
                                            label="Hausnummer*"
                                            type="text"
                                            name="C_HOUSENR"
                                            value={C_HOUSENR}
                                            onChange={this.changeHandler}
                                            title="Hausnummer" />
                                    </Paper>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}> 
                                        <TextField
                                            label="Postleitzahl*"
                                            type="number"
                                            name="C_CI_PC"
                                            value={C_CI_PC}
                                            onChange={this.changeHandler}
                                            title="Postleitzahl" />
                                    </Paper>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}> 
                                        <TextField
                                            label="Stadt*"
                                            type="text"
                                            name="CI_DESC"
                                            value={CI_DESC}
                                            onChange={this.changeHandler}
                                            title="Stadt"/>
                                    </Paper>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}> 
                                        <TextField
                                            label="Land*"
                                            type="text"
                                            name="CO_DESC"
                                            value={CO_DESC}
                                            onChange={this.changeHandler}
                                            title="Land"/>
                                        </Paper>
                                </Grid>    
        
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}> 
                                        <TextField
                                            label="Telefon*"
                                            type="text"
                                            name="C_TEL"
                                            value={C_TEL}
                                            onChange={this.changeHandler}
                                            title="Telefonnummer mit Länder- und Ortsvorwahl"/>
                                    </Paper>
                                </Grid>       
        
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}> 
                                        <TextField
                                            label="E-Mail*"
                                            type="text"
                                            name="C_EMAIL"
                                            value={C_EMAIL}
                                            onChange={this.changeHandler}
                                            title="E-Mail-Adresse des Kunden"/>
                                    </Paper>
                                </Grid> 
        
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}> 
                                        <TextField
                                            label="Firma"
                                            type="text"
                                            name="C_COMPANY"
                                            value={C_COMPANY}
                                            onChange={this.changeHandler}
                                            title="Firmenname, falls vorhanden"/>
                                    </Paper>
                                </Grid>  

                                <Grid item xs={12}>
                                    <Paper className={classes.paper}> 
                                        <Button
                                            style={{ background: "#006064", color: "#ffffff"}}
                                            type="submit"
                                            variant="contained"
                                            title="Kunde anlegen">
                                            Kunde anlegen
                                        </Button>
                                    </Paper>
                                </Grid> 
                            </Grid>
                            <div>
                                <h3>Bestätigung: {(content = this.state.data)}</h3>
                            </div>
                        </FormControl>
                    </div>
                </form>
            </div>
        );
    }
}
  
export default withStyles(useStyles)(AddCustomerForm);