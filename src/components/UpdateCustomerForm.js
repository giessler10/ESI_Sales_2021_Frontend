import React, { Component } from 'react';
import axios from "axios";
import { Button, FormControl, Grid, TextField, Select, MenuItem, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel, IconButton, Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { GridCloseIcon } from '@material-ui/data-grid';

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


const useStyles = theme => ({
    root: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    error: {
        color: "red"
    },
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        paddingBottom: "30px"
    }
});

class UpdateCustomerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            C_FIRSTNAME: "",    //Vorname
            C_LASTNAME: "",     //Nachname
            C_STREET: "",       //Straße
            C_HOUSENR: "",      //Hausnummer
            C_CI_PC: "",        //Postleitzahl
            CI_DESC: "",         //Stadt
            CO_ID: "",          //Länderkennung
            C_TEL: "",          //Telefon
            C_EMAIL: "",        //E-Mail
            C_COMPANY: "",      //Firma
            C_CT_ID: "",        //Kundentyp
            C_NR: props.C_NR,   //Kundennummer    

            //Response
            response: [],
            responseMessage: null,
            responseMessageVisible: false,
            menuItemCountry: [],
            radioButtonCustomerType: [],

            //Error
            errorMessage: null,
            errorMessageVisible: false,
            errorObject: null,
            errors: {},
        };
    }

    async componentDidMount() {
        //Länder laden
        axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers/countries')
            .then(
                (res) => {
                    //console.log(res.status);
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
                    var errorObject = error.response.data;
                    var errorMessage = errorObject.errorMessage;
                    this.setState({
                        errorObject: errorObject,
                        errorMessage: errorMessage
                    });
                    this.setState({ errorMessageVisible: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ errorMessageVisible: false })
                        }, 5000);
                    }
                    )
                }
            );

        //CustomerTypes laden
        axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers/types')
            .then(
                (res) => {
                    //console.log(res.status);
                    return res.data;
                }
            )
            .then(
                (res) => {
                    this.setState({
                        radioButtonCustomerType: res.map((v, key) => (
                            <FormControlLabel key={key} value={v.CT_ID} control={<Radio style={{ color: "green" }} />} label={v.CT_DESC} />
                        ))
                    });
                }
            )
            .catch(
                (error) => {
                    var errorObject = error.response.data;
                    var errorMessage = errorObject.errorMessage;
                    this.setState({
                        errorObject: errorObject,
                        errorMessage: errorMessage
                    });
                    this.setState({ errorMessageVisible: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ errorMessageVisible: false })
                        }, 5000);
                    }
                    )
                }
            );

        //Customer laden
        axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers/' + this.state.C_NR)
            .then(
                (res) => {
                    //console.log(res.status);
                    return res.data[0];
                }
            )
            .then(
                (res) => {
                    if (res.C_COMPANY == "null") {
                        this.setState({
                            C_FIRSTNAME: res.C_FIRSTNAME,
                            C_LASTNAME: res.C_LASTNAME,
                            C_STREET: res.C_STREET,
                            C_HOUSENR: res.C_HOUSENR,
                            C_CI_PC: res.C_CI_PC,
                            CI_DESC: res.CI_DESC,
                            CO_ID: res.C_CO_ID,
                            C_TEL: res.C_TEL,
                            C_EMAIL: res.C_EMAIL,
                            C_CT_ID: res.C_CT_ID
                        });
                    }
                    else {
                        this.setState({
                            C_FIRSTNAME: res.C_FIRSTNAME,
                            C_LASTNAME: res.C_LASTNAME,
                            C_STREET: res.C_STREET,
                            C_HOUSENR: res.C_HOUSENR,
                            C_CI_PC: res.C_CI_PC,
                            CI_DESC: res.CI_DESC,
                            CO_ID: res.C_CO_ID,
                            C_TEL: res.C_TEL,
                            C_EMAIL: res.C_EMAIL,
                            C_COMPANY: res.C_COMPANY,
                            C_CT_ID: res.C_CT_ID
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    var errorObject = error.response.data;
                    var errorMessage = errorObject.errorMessage;
                    this.setState({
                        errorObject: errorObject,
                        errorMessage: errorMessage
                    });
                    this.setState({ errorMessageVisible: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ errorMessageVisible: false })
                        }, 5000);
                    }
                    )
                }
            );

    };

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name == "C_CT_ID" & e.target.value == "B2C") {
            this.setState({ C_COMPANY: "" });
        }
    };

    submitHandler = (e) => {
        e.preventDefault();
        //console.log(this.state);

        //Check Form
        if (this.handleValidation()) {
            //console.log(this.state);
            axios
                .put(
                    "https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/customers/" + this.state.C_NR,
                    this.state
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
                    this.setState({ responseMessageVisible: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ responseMessageVisible: false })
                        }, 5000);
                    });
                })
                .then((response) => this.setState({ response }))
                .catch(
                    (error) => {
                        var errorObject = error.response.data;
                        var errorMessage = errorObject.errorMessage;
                        this.setState({
                            errorObject: errorObject,
                            errorMessage: errorMessage
                        });
                        this.setState({ errorMessageVisible: true }, () => {
                            window.setTimeout(() => {
                                this.setState({ errorMessageVisible: false })
                            }, 5000);
                        }
                        )
                    }
                );
        }
    };

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Vornamen prüfen
        if (this.state.C_FIRSTNAME === "") {
            formIsValid = false;
            errors["C_FIRSTNAME"] = "Vorname angeben";
        }

        //Nachnamen prüfen
        if (this.state.C_LASTNAME === "") {
            formIsValid = false;
            errors["C_LASTNAME"] = "Nachname angeben";
        }

        //Straße prüfen
        if (this.state.C_STREET === "") {
            formIsValid = false;
            errors["C_STREET"] = "Straße angeben";
        }
        if (this.state.C_STREET != "") {
            if (!this.state.C_STREET.match(/^[a-zA-Z,ß,ö,Ö,ü,Ü,ä,Ä,-]+$/)) {
                formIsValid = false;
                errors["C_STREET"] = "Nur Buchstaben erlaubt";
            }
        }

        //Hausnummer prüfen
        if (this.state.C_HOUSENR === "") {
            formIsValid = false;
            errors["C_HOUSENR"] = "Hausnummer angeben";
        }

        //Postleitzahl prüfen
        if (this.state.C_CI_PC === "") {
            formIsValid = false;
            errors["C_CI_PC"] = "Postleitzahl angeben";
        }
        if (this.state.C_CI_PC != "") {
            if (!this.state.C_CI_PC.match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["C_CI_PC"] = "Nur Zahlen erlaubt";
            }
        }

        //Stadt prüfen
        if (this.state.CI_DESC === "") {
            formIsValid = false;
            errors["CI_DESC"] = "Stadt angeben";
        }

        //Land prüfen
        if (this.state.CO_ID === "") {
            formIsValid = false;
            errors["CO_ID"] = "Land angeben";
        }

        //Telefon prüfen
        if (this.state.C_TEL === "") {
            formIsValid = false;
            errors["C_TEL"] = "Telefonnummer angeben";
        }

        //Email
        if (this.state.C_EMAIL === "") {
            formIsValid = false;
            errors["C_EMAIL"] = "E-Mail Adresse angeben";
        }
        if (this.state.C_EMAIL != "") {
            //Zeichen prüfen
            let lastAtPos = this.state.C_EMAIL.lastIndexOf('@');
            let lastDotPos = this.state.C_EMAIL.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.C_EMAIL.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.C_EMAIL.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["C_EMAIL"] = "E-Mail Adresse ungültig";
            }
        }

        //Kundentyp prüfen
        if (this.state.C_CT_ID === "") {
            formIsValid = false;
            errors["C_CT_ID"] = "Kundentyp angeben";
        }

        //Firma prüfen
        if (this.state.C_COMPANY === "" && this.state.C_CT_ID === "B2B") {
            formIsValid = false;
            errors["C_COMPANY"] = "Firma angeben";
        }

        this.setState({ errors: errors });
        return formIsValid;
    };

    proveDisabled = (C_CT_ID) => {
        if (C_CT_ID === "B2C") {
            return true;
        }
        else {
            return false;
        }
    };

    render() {
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
            errorMessage,           //ErrorMessage
            errorMessageVisible,    //StatusErrorMessage
            responseMessage,        //ResponseMessage
            responseMessageVisible  //ReponseMessageStatus
        } = this.state;


        return (

            <form onSubmit={this.submitHandler}>
                <div style={{ padding: "20px", alignContent: "center", fontSize: 12 }}>
                    <Collapse className={classes.alert} in={errorMessageVisible}>
                        <Alert severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setState({ errorMessageVisible: false });
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
                                        this.setState({ responseMessageVisible: false });
                                    }}
                                >
                                    <GridCloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            {responseMessage}
                        </Alert>
                    </Collapse>
                    <FormControl>
                        <Grid container spacing={4}>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Vorname*"
                                    type="text"
                                    name="C_FIRSTNAME"
                                    value={C_FIRSTNAME}
                                    onChange={this.changeHandler}
                                    title="Vorname des Kunden" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_FIRSTNAME"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Nachname*"
                                    type="text"
                                    name="C_LASTNAME"
                                    value={C_LASTNAME}
                                    onChange={this.changeHandler}
                                    title="Nachname des Kunden" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_LASTNAME"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Straße*"
                                    type="text"
                                    name="C_STREET"
                                    value={C_STREET}
                                    onChange={this.changeHandler}
                                    title="Straße" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_STREET"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Hausnummer*"
                                    type="text"
                                    name="C_HOUSENR"
                                    value={C_HOUSENR}
                                    onChange={this.changeHandler}
                                    title="Hausnummer" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_HOUSENR"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Postleitzahl*"
                                    type="number"
                                    name="C_CI_PC"
                                    value={C_CI_PC}
                                    onChange={this.changeHandler}
                                    title="Postleitzahl" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_CI_PC"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Stadt*"
                                    type="text"
                                    name="CI_DESC"
                                    value={CI_DESC}
                                    onChange={this.changeHandler}
                                    title="Stadt" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["CI_DESC"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <FormControl>
                                    <InputLabel id="country">Land*</InputLabel>
                                    <Select
                                        name="CO_ID"
                                        value={CO_ID}
                                        onChange={this.changeHandler}
                                        style={{ width: "200px" }}
                                    >
                                        {this.state.menuItemCountry}
                                    </Select>
                                    <div>
                                        <span className={classes.error}>{this.state.errors["CO_ID"]}</span>
                                    </div>
                                </FormControl>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Telefon*"
                                    type="text"
                                    name="C_TEL"
                                    value={C_TEL}
                                    onChange={this.changeHandler}
                                    title="Telefonnummer mit Länder- und Ortsvorwahl" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_TEL"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="E-Mail*"
                                    type="text"
                                    name="C_EMAIL"
                                    value={C_EMAIL}
                                    onChange={this.changeHandler}
                                    title="E-Mail-Adresse des Kunden" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_EMAIL"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <TextField
                                    label="Firma"
                                    type="text"
                                    name="C_COMPANY"
                                    value={C_COMPANY}
                                    onChange={this.changeHandler}
                                    disabled={this.proveDisabled(this.state.C_CT_ID)}
                                    title="Firmenname" />
                                <div>
                                    <span className={classes.error}>{this.state.errors["C_COMPANY"]}</span>
                                </div>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel> <b>Kundentyp</b></FormLabel>

                                    <RadioGroup name="C_CT_ID" value={C_CT_ID} onChange={this.changeHandler}>
                                        {this.state.radioButtonCustomerType}
                                    </RadioGroup>
                                    <div>
                                        <span className={classes.error}>{this.state.errors["C_CT_ID"]}</span>
                                    </div>
                                </FormControl>
                            </Grid>



                            <Grid item xs={12}>
                                <Button
                                    style={{ background: "#006064", color: "#ffffff" }}
                                    type="submit"
                                    variant="contained"
                                    title="Änderungen speichern">
                                    Änderungen speichern
                                </Button>
                            </Grid>

                        </Grid>
                    </FormControl>
                </div>
            </form>

        );
    }
}

export default withStyles(useStyles)(UpdateCustomerForm);