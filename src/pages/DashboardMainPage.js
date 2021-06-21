import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//Seitenimport
import Dashboard from '../components/Dashboard';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/
  

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
