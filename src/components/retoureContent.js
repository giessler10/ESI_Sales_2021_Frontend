import React from 'react';
import {Button, FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import { Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';


//Seiteninhalte
import OrderPositions from './orderPositionsTable';
import RetoureReasons from './retoureReasons';
import RetoureTest from './retoureContent copy';


const useStyles = makeStyles((theme) => ({
  gridStyle: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textColor: "green",
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }, 
  
  paper:{
    width: "1200px",
    height:"700%",

  },

}));


const GreenRadio = withStyles({
  root: {
    color: "#006064",
    '&$checked': {
      color: "#006064",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const RetoureContent = () => {
  const classes = useStyles();
  return (
<div>    
      <div className={classes.root}>
        <div style={{ paddingLeft:"100px", paddingBotton:"20px", alignContent:"center", fontSize: 12}}>
        <Paper elevation={3} style={{padding: "60px"}} className={classes.paper}>

          <FormControl>
            <Grid container spacing={4}>
            <Grid item xs={12}>
          <h1> Details zu Auftrag: xxxxx </h1> 
        </Grid>
              <Grid item sm={3} xs={12}>
                <h2>Kundeninformation</h2>
              </Grid>
              <Grid item sm={3} xs={12}>
                <h2>Bestelldetails</h2>
              </Grid>
              <Grid item sm={3} xs={12}/>
              <Grid item sm={3} xs={12}/>
              <Grid item sm={3} xs={12}>
                <Input defaultValue="Name" disabled inputProps={{ 'aria-label': 'Name' }} />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Input defaultValue="Status" disabled inputProps={{ 'aria-label': 'Name' }} />
              </Grid>
              <Grid item sm={3} xs={12}/>
              <Grid item sm={3} xs={12}/>
              <Grid item sm={3} xs={12}>
                <Input defaultValue="Vorname" disabled inputProps={{ 'aria-label': 'Name' }} />  
              </Grid>
              <Grid item sm={3} xs={12}>
                <Input defaultValue="Datum" disabled inputProps={{ 'aria-label': 'Name' }} />  
              </Grid>
              <Grid item sm={3} xs={12}/>
              <Grid item sm={3} xs={12}/>
              <Grid item sm={3} xs={12}/>
              <Grid item sm={3} xs={12}>
                <Input defaultValue="Unternehmen" disabled inputProps={{ 'aria-label': 'Name' }} />  
              </Grid>
              <Grid item sm={3} xs={12}/>     
              <Divider/>
              <Grid item sm={6} xs={12}>            
            <TextField
                        variant="outlined" 
                        size="large"
                        label="Grund der Reklamation / Retoure: "
                        type="text"
                        name="problem"
                        value=""
                        multiline
                        rows={6}
                        title= "Grund der Reklamation / Retoure"
                        style = {{width: 500}}/>        
            </Grid>
            <Grid item sm={6} xs={12}>
              <h2>Art der Beanstandung: </h2>
              <RadioGroup defaultValue="a" aria-label="retourenArt" name="customized-radios">
                <FormControlLabel
                  value="a"
                  control={<GreenRadio />}
                  label="Reklamation"/>
                <FormControlLabel
                  value="k"
                  control={<GreenRadio />}
                  label="Retoure"/>
               </RadioGroup>
              </Grid> 
            </Grid>           
          </FormControl>
          </Paper>  
        </div>
      </div>

      <div className={classes.root} style={{ paddingLeft:"100px", paddingBotton:"20px", alignContent:"center", fontSize: 12}}>    
      <Paper elevation={3} style={{padding: "60px"}} className={classes.paper}>
      <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>            
                <h1>Auftragspositionen auswählen:</h1>    
            </Grid>
            <Grid item xs={12} md={12} lg={12}>            
                <OrderPositions />        
            </Grid>
            <Grid item xs={12} md={12} lg={12}> 
            <h1>Aktuelle Beanstandung der Position:</h1>              
                <RetoureReasons />
            </Grid>
            <Grid item xs={12}/>                     
            <Grid item sm={12} xs={12}>
            <Button
              style={{ background: "#006064", color: "#ffffff"}}
              type="submit"
              variant="contained"
              title="Beanstandung anlegen">
              Beanstandung anlegen
            </Button>
              </Grid> 
          </Grid>
          </Paper>         
      </div>

      
    

</div>


  )
}

export default RetoureContent