import React from 'react';
import { FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/


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