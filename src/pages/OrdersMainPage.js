import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { CellWifi, PinDropSharp } from '@material-ui/icons';
//import 'scss/modules.container.scss'


//importierte Seiten
import OrdersWithProblems from '../components/ordersWithProblemsTable';
import OrdersInProgress from '../components/ordersInProgressTable';
import OrdersOpen from '../components/openOrdersTable';


const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Orders = () => {
  const classes = useStyles();
    return (
      <div>
        <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
          <form > 
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}> 
              <h2> Offene Aufträge </h2>
              </Paper>
              <OrdersOpen />
            </Grid> 
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}> 
              <h2> Aufträge in Bearbeitung </h2>
              </Paper>
            </Grid> 
          </Grid>
           <OrdersInProgress />


          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}> 
              <h2> Aufträge mit Problemen </h2>
              </Paper>
            </Grid> 
          </Grid>
          
<OrdersWithProblems />
          </form>
        </div>
      </div>
    )
  }

export default Orders