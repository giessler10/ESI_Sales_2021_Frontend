import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


const options = { filterType: 'checkbox' };
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


const Einstellungen = () => {
  const classes = useStyles();
  return (
    <div >
      <Paper className={classes.paper}>
        <h2> Einstellungen </h2>
      </Paper>
    </div>
  )
}
export default Einstellungen