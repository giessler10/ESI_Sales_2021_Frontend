import React from 'react';
import { Typography, Button, FormControl, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Box from '@material-ui/core/Box';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';

//Seitenimport
import Dashboard from './pageContent/DashboardCompleteContent';

const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


const DashboardContent = () => {
  return (
      <Dashboard></Dashboard>
  )
}

export default DashboardContent
