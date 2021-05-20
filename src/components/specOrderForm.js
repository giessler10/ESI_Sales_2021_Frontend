import React from 'react';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  gridStyle: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const SpecOrders = () => {
  const classes = useStyles();
    return (
        <div>
         <form>
            <div >
            </div>           
            <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
                  
          <FormControl className={classes.gridStyle}>
          <Grid container spacing={4}>
          <Grid item sm={6} xs={12}></Grid>
          <Grid item sm={6} xs={12}>

        <TextField
          id="date"
          label="Datum"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
          shrink: true,
          width: "20px"
          }}/>
          </Grid> 
        <Grid item sm={6} xs={12}>

          <TextField
                        label="Vorname"
                        type="text"
                        name="firstName"
                        value=""
                        title= "Vorname des Kunden"/>
        </Grid>
        <Grid item sm={6} xs={12}>
            
          <TextField
                        label="Nachname"
                        type="text"
                        name="surName"
                        value=""
                        title="Nachname des Kunden"/>
        </Grid> 
        
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
        
          <TextField
                        label="Bestellnummer"
                        type="number"
                        name="Bestellnummer"
                        value=""
                        title="Bestellnummer" />

        </Grid>
        <Grid item sm={6} xs={12}>

        <TextField
                        label="Status"
                        type="number"
                        name="status"
                        value=""
                        title="Status" />
        </Grid>  
        
      <Grid item xs={12}/>
        
     </Grid>
     </Grid>
     </FormControl>
     </div>
     </form>
     </div>
)
}

export default SpecOrders