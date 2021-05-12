import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { CellWifi, PinDropSharp } from '@material-ui/icons';
//import 'scss/modules.container.scss'
import PropTypes from 'prop-types';
import {useTheme, createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Box from '@material-ui/core/Box';


//importierte Seiten
import OrdersWithProblems from '../components/ordersWithProblemsTable';
import OrdersInProgress from '../components/ordersInProgressTable';
import OrdersOpen from '../components/openOrdersTable';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00695f"
      ,
    },
    secondary: {
      main: '#f44336',
    },
  },
});


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

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Orders = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            TabIndicatorProps={{style: {backgroundColor: "#006064"}}}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Offene Aufträge" icon={<PersonPinIcon />} {...a11yProps(2)} />
            <Tab label="Aufträge in Bearbeitung" icon={<HelpIcon />} {...a11yProps(3)} />
            <Tab label="Aufträge mit Problemen" icon={<HelpIcon />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid item xs={12}>
        <h2> Offene Aufträge </h2> 
        </Grid>
        </div>
        <OrdersOpen />

      </TabPanel>
      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid item xs={12}>
        <h2> Aufträge in Bearbeitung </h2> 
        </Grid>
        </div>
        <OrdersInProgress />

      </TabPanel>
      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid item xs={12}>
        <h2> Aufträge mit Problemen </h2> 
        </Grid>
        </div>
        <OrdersWithProblems />

      </TabPanel>
          
      </div>
    )
  }
}