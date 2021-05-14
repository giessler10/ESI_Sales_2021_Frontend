import React from 'react';
import { Typography, Button, FormControl, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {useTheme, createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Box from '@material-ui/core/Box';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

//Seitenimport
//import AddCustomerForm from './pageContent/AddCustomerForm';
import AddCustomerForm from '../components/AddCustomerForm';
import LastOrdersForm from '../components/lastOrdersForm';
import RecentOrdersTable from '../components/recentOrderTable';
import CustomerTable from '../components/CustomerTable';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
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
          <Tab label="Alle Kunden" icon={<AccessibilityIcon />} {...a11yProps(2)} />
          <Tab label="Neuen Kunden anlegen" icon={<PersonPinIcon />} {...a11yProps(2)} />
          <Tab label="Letzte Aufträge" icon={<HelpIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <h2 >Liste aller Kunden</h2>
          </Grid>
        </div>
        <CustomerTable></CustomerTable>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <h2> Kunde hinzufügen </h2> 
          </Grid>
        </div>
        <AddCustomerForm></AddCustomerForm>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <h2 >Kundendetails abfragen</h2>
            <LastOrdersForm></LastOrdersForm>
          </Grid>
          <Grid item xs={12}>
            <h2> Kundendetails: letzte Aufträge </h2>
            <RecentOrdersTable></RecentOrdersTable>
          </Grid>
        </div>
      </TabPanel>

    </div>
  )
}