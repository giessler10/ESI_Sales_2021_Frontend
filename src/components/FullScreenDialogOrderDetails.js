import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import UpdateCustomerForm from './UpdateCustomerForm';
import CustomerOrders from './customerOrdersTable';
import {Grid} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import OrderPositionsTable from './OrderPositionsTable';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#006064",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textColor: "green",
    textAlign: 'center',
    color: theme.palette.text.secondary
  },  
  table: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%'
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogOrderDetails(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  var OI_O_NR = props.OI_O_NR;
  var selectedRows = props.selectedRows;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}> <DescriptionIcon/>
        Bestelldetails
      </Button>
      <Dialog fullScreen open={open} onClose={handleClickOpen} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Bestelldetails
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid item xs={12}>
            <h2 >Bestellnummer {OI_O_NR}</h2>
          </Grid>
        </div>
        Hier muss noch der Order Header ergänzt werden
        <div className={classes.root}>
          <Grid item xs={12}>
            <h2>Positionen</h2>
          </Grid>
        </div>
        <div className={classes.table}>
          <OrderPositionsTable OI_O_NR={OI_O_NR}></OrderPositionsTable>
        </div>
      </Dialog>
    </div>
  );
}