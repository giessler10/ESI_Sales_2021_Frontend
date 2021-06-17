import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//Seitenimport
import Dashboard from '../components/Dashboard';

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
      <Dashboard />
  )
}

export default DashboardContent
