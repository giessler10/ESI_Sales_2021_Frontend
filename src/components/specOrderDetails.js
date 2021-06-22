import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//import Seiteninhalte
import SpecOrderForm from './specOrderForm';
import SpecOrderTable from './specOrderTable';

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


const options = { filterType: 'checkbox' };
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textColor: "green",
    textAlign: 'center',
  },
}));


const SpecOrderDetails = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>

      <h2> Details zu Auftrag: xxxxxxxxxx</h2>
      <SpecOrderForm />

      <h2> Auftragsbestandteile </h2>
      <SpecOrderTable />

    </div>
  )
}

export default SpecOrderDetails