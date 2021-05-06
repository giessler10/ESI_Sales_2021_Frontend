import React from 'react';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const AddCustomer = () => {
  const classes = useStyles();
    return (
      <div>
      <form>
        <div >
          <h2 >Kunde anlegen</h2>
        </div>

            <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
         
          <FormControl>
          <Grid container spacing={4}>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>
          <TextField
                        label="Vorname*"
                        type="text"
                        name="firstName"
                        value=""
                        title= "Vorname des Kunden"/>
          </Paper>

        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>
            
          <TextField
                        label="Nachname*"
                        type="text"
                        name="surName"
                        value=""
                        title="Nachname des Kunden"/>
          </Paper>
        </Grid> 
        

      <Grid container spacing={4}>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>            
          <TextField
                        label="Straße*"
                        type="text"
                        name="street"
                        value=""
                        title="Straße und Hausnummer" />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="Postleitzahl*"
                        type="number"
                        name="PostCode"
                        value=""
                        title="Postleitzahl der Stadt" /></Paper>
        </Grid>  
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="Stadt*"
                        type="text"
                        name="city"
                        value=""
                        title="Name der Stadt"/></Paper>
        </Grid>  
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="Land*"
                        type="text"
                        name="country"
                        value=""
                        title="Kürzel des Landes, z.B. Deutschland = DE"/></Paper>
        </Grid>    

                <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="Telefon*"
                        type="number"
                        name="phone"
                        value=""
                        title="Telefonnummer mit Länder- und Ortsvorwahl"/></Paper>
        </Grid>       

        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="E-Mail*"
                        type="text"
                        name="E-mail"
                        value=""
                        title="E-Mail-Adresse des Kunden"/></Paper>
        </Grid> 

          <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="Firma"
                        type="text"
                        name="company"
                        value=""
                        title="Firmenname, falls vorhanden"/></Paper>
        </Grid>  
        </Grid> 




      <Grid item xs={12}>
          <Paper className={classes.paper}> 
          <Button
                      style={{ background: "#006064", color: "#ffffff"}}
                      type="submit"
                      variant="contained"
                      title="Kunde anlegen">
                        Kunde anlegen
                        </Button></Paper>
        </Grid> 
     </Grid>
</FormControl>


</div>
</form>
</div>


)
}

export default AddCustomer