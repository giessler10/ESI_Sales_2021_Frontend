import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Button, FormControl, Grid} from '@material-ui/core';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';
import AllInboxIcon from '@material-ui/icons/AllInbox';

//importierte Seiten
import ShippingTable from '../components/ShippingTable';
import StorageTable from '../components/StorageTable';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    root: {
      flexGrow: 1,
      width: "91vw",
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
                <Tab label="Auslagerfähige Aufträge" icon={<AllInboxIcon />} {...a11yProps(2)} />
                <Tab label="Versandbereite Aufträge" icon={<AlarmOnTwoToneIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}> 
            <div >
              <StorageTable/>
              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
            <div >   
              
              <ShippingTable/>
              
              </div>
            </TabPanel>   
        </div>
    )
};