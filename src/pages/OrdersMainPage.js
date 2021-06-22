import React from 'react';
import Typography from '@material-ui/core/Typography';
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
import AddIcon from '@material-ui/icons/Add';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import BrushIcon from '@material-ui/icons/Brush'; // Oder anstatt Brush -> Build

//importierte Seiten
import OrdersWithProblems from '../components/ordersWithProblemsTable';
import OrdersInProgress from '../components/ordersInProgressTable';
import OrdersInDraft from '../components/ordersInDraft';
import OrdersOpen from '../components/openOrdersTable';
import OrderTable from '../components/OrderTable';
import RetoureTable from '../components/RetoureTable'
import NewOrderTableClass from '../components/NewOrderTableClass';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/

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
          <Tab label="Alle Aufträge" icon={<AllInclusiveIcon />} {...a11yProps(2)} />
          <Tab label="Aufträge im Entwurf" icon={<BrushIcon />} {...a11yProps(2)} />
          <Tab label="Offene Aufträge" icon={<AssignmentIcon />} {...a11yProps(2)} />
          <Tab label="Aufträge in Bearbeitung" icon={<DoubleArrowIcon />} {...a11yProps(2)} />
          <Tab label="Aufträge mit Problemen" icon={<NotificationImportantIcon />} {...a11yProps(2)} />
          <Tab label="Geschlossene Aufträge" icon={<AssignmentTurnedInIcon />} {...a11yProps(2)} />
          <Tab label="Neuer Auftrag erfassen" icon={<AddIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <OrderTable></OrderTable>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <OrdersInDraft/>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <OrdersOpen />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <OrdersInProgress />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <OrdersWithProblems />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <RetoureTable/>    
      </TabPanel>

      <TabPanel value={value} index={6}>
          <NewOrderTableClass/>
      </TabPanel>
        
    </div>
  )}