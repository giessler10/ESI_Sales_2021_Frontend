import React from 'react';
import {Button, FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import { Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';


//Seiteninhalte
import OrderPositions from './orderPositionsTable';
import RetoureReasons from './retoureReasons';


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

    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=3 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=3 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=3 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=3 sm=3</Paper>
      </Grid>
    </Grid>
  </div>


  )
}

export default RetoureContent