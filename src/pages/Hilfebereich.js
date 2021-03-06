import React from 'react';
import FaqBereich from '../components/Faq.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//Kontaktformular
import Form from '../components/ContactForm/ContactForm';

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
  paperII: {
    padding: theme.spacing(2),
    align: 'center',
    margin: "0",
    color: theme.palette.text.secondary,
    width: '500px',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


const Hilfebereich = () => {
  const classes = useStyles();
  return (
    <div align="center" justify="center" alignItems="center">
      <Paper className={classes.paper}>
        <h2>Hilfebereich<br></br> </h2>
        <FaqBereich />
      </Paper>
      <br></br>
      <Paper>
        <Paper className={classes.paperII} >
          <h2>Trotzdem noch Fragen?</h2>
          <h4>Senden Sie uns ein Ticket. Die CMS-Consulting wird sich binnen des nächsten Werktages bei Ihnen melden.</h4>
          <Form />
        </Paper>
      </Paper>
    </div>
  )
}
export default Hilfebereich