import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

//Seitenimport
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