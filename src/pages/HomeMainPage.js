import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


//Testtabelle Aufbau
const columns = ["Order. No.", "customer_name", "customer_type", "customer_number", "Order_date", "Summe_QTY", "Order_Status" ];

const data = [
["1", "Schnitzelwerk", "B","1", "15/2/2020", "5", "Versand"],
["2", "Christoph", "P","2", "15/2/2020", "5", "in Produktion"],
["3", "Rockcafe Altdorf", "B", "3", "15/2/2020", "5", "Retoure"],
["4", "Edeka", "B","4", "15/2/2020", "5", "QS"],
];

//Testtabelle aufbau ende

const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Homepage = () => {
  const classes = useStyles();
    return (
        <div>
          <div style={{ padding: "20px" }}>
            <h2>ERP System Verkauf und Versand 2021</h2>
            <h3>Startseite</h3>
          </div>

            <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
         <form >
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

        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <input
                          type="radio"
                          value={true}
                          name="business"/> Kunde anlegen<br /></Paper>
        </Grid>

          <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <input
                          type="radio"
                          value={false}
                          name="business"/> Kundendetails anzeigen<br /></Paper>
        </Grid> 

      <Grid item xs={12}>
          <Paper className={classes.paper}> 
          <Button
                      style={{ background: "#006064", color: "#ffffff"}}
                      type="submit"
                      variant="contained"
                      title="Aufträge anzeigen / Kunde anlegen">
                        submit
                        </Button></Paper>
        </Grid> 
        <Grid item xs={12}>
          <Paper className={classes.paper}> 
          <h2> Kundendetails: letzte Aufträge </h2>
          </Paper>
        </Grid> 
     </Grid>
</FormControl>

<MUIDataTable
  data={data}
  columns={columns}
  options={options}/>

</form>
</div>

</div>



)



}

export default Homepage