import React from 'react';
import { FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import { Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import RecentProblems from './recentProblemsTable';

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
}));

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


const EditOrders = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Grid item xs={12}>
          <h2> Details zu Auftrag: xxxxx </h2> 
        </Grid>
      </div>
      <div className={classes.root}>
        <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
          <FormControl>
            <Grid container spacing={4}>
              <Grid item sm={6} xs={12}>
                <h2>Kundeninformation</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                <h2>Bestelldetails</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input defaultValue="Name" disabled inputProps={{ 'aria-label': 'Name' }} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input defaultValue="Status" disabled inputProps={{ 'aria-label': 'Name' }} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input defaultValue="Vorname" disabled inputProps={{ 'aria-label': 'Name' }} />  
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input defaultValue="Datum" disabled inputProps={{ 'aria-label': 'Name' }} />  
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input defaultValue="Unternehmen" disabled inputProps={{ 'aria-label': 'Name' }} />  
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </div>
      <div className={classes.root}>
        <Grid item xs={12}>
          <h2> Auftragsbestandteile </h2> 
        </Grid>
      </div>
      <div className={classes.root}>
        <div style={{ width:"800", padding: "20px", alignContent:"center", fontSize: 12}}>
          
            <RecentProblems></RecentProblems>
          
        </div>
      </div>

    </div>
  )
}

export default EditOrders