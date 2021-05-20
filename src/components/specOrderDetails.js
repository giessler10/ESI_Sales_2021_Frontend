import React from 'react';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

//import Seiteninhalte
import SpecOrderForm from './specOrderForm';
import SpecOrderTable from './specOrderTable';


const options = {filterType: 'checkbox'};
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