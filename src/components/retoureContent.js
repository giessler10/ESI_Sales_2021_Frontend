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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


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

  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const RetoureContent = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <div>    
      <div className={classes.root}>
        <div style={{ paddingLeft:"100px", paddingBotton:"20px", alignContent:"center", fontSize: 12}}>
          <Paper elevation={3} style={{padding: "60px"}} className={classes.paper}>
            <FormControl>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <h1> Auftragsdetails </h1> 
                </Grid>
                <Grid item sm={6} xs={18}>
                  <h2>Kundeninformation</h2>
                </Grid>
                <Grid item sm={6} xs={18}>
                  <h2>Bestelldetails</h2>
                </Grid>
                <Grid item sm={6} xs={18}>
                  <Input defaultValue="Name" disabled inputProps={{ 'aria-label': 'Name' }} />
                </Grid>
                <Grid item sm={6} xs={18}>
                  <Input defaultValue="Status" disabled inputProps={{ 'aria-label': 'Name' }} />
                </Grid>
                <Grid item sm={6} xs={18}>
                  <Input defaultValue="Vorname" disabled inputProps={{ 'aria-label': 'Name' }} />  
                </Grid>
                <Grid item sm={6} xs={18}>
                  <Input defaultValue="Datum" disabled inputProps={{ 'aria-label': 'Name' }} />  
                </Grid>
                <Grid item sm={6} xs={18}/>
                <Grid item sm={6} xs={18}>
                  <Input defaultValue="Unternehmen" disabled inputProps={{ 'aria-label': 'Name' }} />  
                </Grid>
                <Grid item sm={6} xs={18}/>     
                <Divider/>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel  htmlFor="age-native-simple" >Grund der Retoure</InputLabel>
                    <Select
                      native
                      value={state.age}
                      onChange={handleChange}
                      inputProps={{
                        name: 'Retouregrund',
                        id: 'retouregrund',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={1}>zu klein</option>
                      <option value={2}>zu groß</option>
                      <option value={3}>defekt - beschädigt</option>
                      <option value={4}>falsche Farbe</option>
                      <option value={5}>Fehler meinerseits</option>
                      <option value={6}>Fehler von YourShirt</option>
                      <option value={7}>zu spät geliefert</option>
                      <option value={8}>enttäuscht</option>
                      </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <h2>Art der Beanstandung: </h2>
                <RadioGroup defaultValue="a" aria-label="retourenArt" name="customized-radios">
                  <Grid item xs={12}>
                    <FormControlLabel                 
                      value="a"
                      control={<GreenRadio />}
                      label="Reklamation"/>
                    <FormControlLabel
                      value="k"
                      control={<GreenRadio />}
                      label="Retoure"/>
                  </Grid>
                </RadioGroup> 
              </Grid>
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
          </FormControl>
        </Paper>  
      </div>
    </div>

    <div className={classes.root} style={{ paddingLeft:"100px", paddingBotton:"20px", alignContent:"center", fontSize: 12}}>    
      <Paper elevation={3} style={{padding: "60px"}} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>            
            <h1>Auftragspositionen der Retoure wählen</h1>    
          </Grid>
          <Grid item xs={12} md={12} lg={12}>            
            <OrderPositions />        
          </Grid>
        </Grid>
      </Paper>         
    </div>
  </div>
)}

export default RetoureContent