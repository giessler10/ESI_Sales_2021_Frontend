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


const LastOrders = () => {
  const classes = useStyles();
    return (
        <div>
         <form>
            <div >
              <h2 >Kundendetails abfragen</h2>
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
                        label="Kundennummer*"
                        type="number"
                        name="Kundennummer"
                        value=""
                        title="Kundennummer" />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="Kundenart"
                        type="text"
                        name="Kundenart"
                        value=""
                        title="Kundenart" /></Paper>
        </Grid>  
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}> 
          <TextField
                        label="Unternehmen*"
                        type="text"
                        name="Unternehmen"
                        value=""
                        title="Unternehmen"/></Paper>
        </Grid>  

        
        </Grid> 

      <Grid item xs={12}>
          <Paper className={classes.paper}> 
          <Button
                      style={{ background: "#006064", color: "#ffffff"}}
                      type="submit"
                      variant="contained"
                      title="Kundendetails abfragen">
                        submit
                        </Button></Paper>
        </Grid> 
     </Grid>
</FormControl>

</div>
</form>
</div>






)



}

export default LastOrders