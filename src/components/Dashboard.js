import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { Collapse } from '@material-ui/core';
import { GridCloseIcon } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';


/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


//Import components
import DashboardChart from '../components/DashboardChart';
import DashboardDepositsSumQTY from '../components/DashboardDepositsSumQTY';
import DashboardDepositsSumPrice from '../components/DashboardDepositsSumPrice';
import DashboardDepositsSumQualityissueQTY from '../components/DashboardDepositsSumQualityissueQTY';
import DashboardDepositsSumReturnQTY from '../components/DashboardDepositsSumReturnQTY';
import DashboardDepositsSumClaimQTY from '../components/DashboardDepositsSumClaimQTY';
import DashboardDepositsDistinctHexColors from '../components/DashboardDepositsDistinctHexColors';
import Orders from '../components/recentOrderTable';


export default function Dashboard() {

  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [allData, setAllData] = useState([]); //alle Daten von DB.
  const [kpi, setKpi] = useState([]); //alle Daten von DB.
  const [chart, setchart] = useState([]); //alle Daten von DB.
  const [year, setYear] = useState(new Date().getFullYear());

  //Error,
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  useEffect(() => {
    // Get Statisitc
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/statistics')
      .then(
        (res) => {
          setAllData(res.data); //Set new table data
          setKpi(res.data.KPIs); //Set new table data
          setchart(res.data.chart); //Set new table data
        })
      .catch(
        (error) => {
          //Error-Meldung ausgeben
          var errorObject = error.response.data;
          var errorMessage = errorObject.errorMessage;
          setErrorMessage(errorMessage);
          setErrorMessageVisible(true)
          window.setTimeout(() => {
            setErrorMessageVisible(false);
          }, 5000);
        }
      );
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Collapse className={classes.alert} in={errorMessageVisible}>
          <Alert severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorMessageVisible(false);
                }}
              >
                <GridCloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {errorMessage}
          </Alert>
        </Collapse>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <DashboardChart />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <h2>KPIs {year} <br></br> </h2>
            </Grid>
            <Grid item xs={6} md={4}>
              <Paper className={fixedHeightPaper}>
                <DashboardDepositsSumQTY data={kpi.length === 0 ? 0 : kpi.SumQTY} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <DashboardDepositsSumPrice data={kpi.length === 0 ? 0 : kpi.SumPrice} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <DashboardDepositsDistinctHexColors data={kpi.length === 0 ? 0 : kpi.DistinctHexColors} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <DashboardDepositsSumQualityissueQTY data={kpi.length === 0 ? 0 : kpi.SumQualityissueQTY} sumQTY={kpi.length === 0 ? 0 : kpi.SumQTY} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <DashboardDepositsSumReturnQTY data={kpi.length === 0 ? 0 : kpi.SumReturnQTY} sumQTY={kpi.length === 0 ? 0 : kpi.SumQTY} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <DashboardDepositsSumClaimQTY data={kpi.length === 0 ? 0 : kpi.SumClaimQTY} sumQTY={kpi.length === 0 ? 0 : kpi.SumQTY} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <h2>Aufträge der letzten 7 Tage<br></br> </h2>
            </Grid>
            <Grid item xs={12} className={Paper}>
              <Orders />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}