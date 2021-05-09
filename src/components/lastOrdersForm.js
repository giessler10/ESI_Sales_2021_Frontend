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


const LastOrders = () => {
  const classes = useStyles();
    return (
        <div>
         <form>
            <div >
            </div>           
            <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
                  
          <FormControl className={classes.gridStyle}>
          <Grid container spacing={4}>
        <Grid item sm={6} xs={12}>

          <TextField
                        label="Vorname*"
                        type="text"
                        name="firstName"
                        value=""
                        title= "Vorname des Kunden"/>


        </Grid>
        <Grid item sm={6} xs={12}>
            
          <TextField
                        label="Nachname*"
                        type="text"
                        name="surName"
                        value=""
                        title="Nachname des Kunden"/>

        </Grid> 
        

      <Grid container spacing={4}>
        <Grid item sm={6} xs={12}>
        
          <TextField
                        label="Kundennummer*"
                        type="number"
                        name="Kundennummer"
                        value=""
                        title="Kundennummer" />

        </Grid>
        <Grid item sm={6} xs={12}>

          <TextField
                        label="Kundenart"
                        type="text"
                        name="Kundenart"
                        value=""
                        title="Kundenart" />
        </Grid>  
        <Grid item sm={6} xs={12}>

          <TextField
                        label="Unternehmen*"
                        type="text"
                        name="Unternehmen"
                        value=""
                        title="Unternehmen"/>
        </Grid>  

        
        </Grid> 

      <Grid item xs={12}>

          <Button
                      style={{ background: "#006064", color: "#ffffff"}}
                      type="submit"
                      variant="contained"
                      title="Kundendetails abfragen">
                        submit
                        </Button>
        </Grid> 
     </Grid>
</FormControl>

</div>
</form>
</div>







)



}

export default LastOrders