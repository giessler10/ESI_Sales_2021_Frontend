import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

//importierte Seiten
import OrdersWithProblems from '../components/ordersWithProblemsTable';
import OrdersInProgress from '../components/ordersInProgressTable';
import OrdersOpen from '../components/openOrdersTable';
import OrderTable from '../components/OrderTable'


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
          <Tab label="Alle Aufträge" icon={<AllInclusiveIcon />} {...a11yProps(2)} />
          <Tab label="Offene Aufträge" icon={<AssignmentIcon />} {...a11yProps(2)} />
          <Tab label="Aufträge in Bearbeitung" icon={<DoubleArrowIcon />} {...a11yProps(2)} />
          <Tab label="Aufträge mit Problemen" icon={<NotificationImportantIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
      <div className={classes.root}>
        <Grid item xs={12}>
          <h2> Alle Aufträge </h2> 
        </Grid>
      </div>
      <OrderTable></OrderTable>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <h2> Offene Aufträge </h2> 
          </Grid>
        </div>
      <OrdersOpen />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div className={classes.root}>
          <Grid item xs={12}>
        <h2> Aufträge in Bearbeitung </h2> 
        </Grid>
        </div>
        <OrdersInProgress />

      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className={classes.root}>
          <Grid item xs={12}>
        <h2> Aufträge mit Problemen </h2> 
        </Grid>
        </div>
      <OrdersWithProblems />

      </TabPanel>
        
    </div>
  )}