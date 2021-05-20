import React from 'react';
import FaqBereich from '../components/Faq.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//chatbot importieren
import Chatbot from '../components/Chatbot.js';
import Form from '../components/ContactForm/ContactForm';



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


const Hilfebereich = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
            <h2>Hilfebereich<br></br> </h2>   

           <FaqBereich/>
           </Paper>

           <Chatbot/>

           <br></br>
           <Paper className={classes.paper}>
           <h2>Kontaktformular</h2>
<Form/>
</Paper>

           
        </div>
    )
}
export default Hilfebereich