import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { CellWifi, PinDropSharp } from '@material-ui/icons';
//import 'scss/modules.container.scss'


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

//TesttabelleI Aufbau
const columnsOffeneAuftraege = ["Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY"];
const dataOffeneAuftraege = [
  ["1", "Schnitzelwerk", "B", "15/2/2020", "5"],
  ["2", "Christoph", "P", "15/2/2020", "5"],
  ["3", "Rockcafe Altdorf", "B", "15/2/2020", "5"],
  ["4", "Edeka", "B","15/2/2020", "5"],
];
//TesttabelleI Aufbau Ende

//TesttabelleII Aufbau
const columnsAuftraegeInBearbeitung = ["Bearbeitung", "Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY", "Papiere", "Order_Status"];
const dataAuftraegeInBearbeitung = [
  [<div><Button style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "12", "Lena", "B", "15/2/2020", "5", "", ""],
  [<div><Button style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "21", "Max", "P", "15/2/2020", "5", "", ""],
  [<div><Button style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "332", "Deutsche Post", "B", "15/2/2020", "5", "", ""],
  [<div><Button style={{ background: "#006064", color: "#ffffff"}} type="submit" variant="contained" title="Auftrag bearbeiten"> submit </Button></div>, "41", "Luca", "B","15/2/2020", "5", "", ""],
];
//TesttabelleII Aufbau Ende

//TesttabelleIII Aufbau
const columnsAuftraegeMitProblemen = ["Order. No.", "customer_name", "customer_type", "Order_date", "Summe_QTY", "Order_Status", "Problems"];
const dataAuftraegeMitProblemen = [
  ["112", "Lena", "B", "15/2/2020", "5", "", ""],
  ["23", "Max", "P", "15/2/2020", "5", "", ""],
  ["22", "Deutsche Post", "B", "15/2/2020", "5", "", ""],
  ["32", "Luca", "B","15/2/2020", "5", "", ""],
];
//TesttabelleIII Aufbau Ende

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
            </Grid> 
          </Grid>
            <MUIDataTable
              data={dataOffeneAuftraege}
              columns={columnsOffeneAuftraege}
              options={options}/>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}> 
              <h2> Aufträge in Bearbeitung </h2>
              </Paper>
            </Grid> 
          </Grid>
            <MUIDataTable
              data={dataAuftraegeInBearbeitung}
              columns={columnsAuftraegeInBearbeitung}
              options={options}/>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}> 
              <h2> Aufträge mit Problemen </h2>
              </Paper>
            </Grid> 
          </Grid>
            <MUIDataTable
              data={dataAuftraegeMitProblemen}
              columns={columnsAuftraegeMitProblemen}
              options={options}/>
          </form>
        </div>
      </div>
    )
  }

export default Orders