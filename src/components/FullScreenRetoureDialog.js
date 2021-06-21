import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ReplayIcon from '@material-ui/icons/Replay';
import OrderHeader from './OrderHeader';
import React from "react";
import {Button, Dialog } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RetoureReklamationCellEdittable from './RetoureReklamationCellEdittable';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/
  

import RetoureHistoryTable from './RetoureHistoryTable';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#006064",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  Button:{
    color: "#006064",
    backgroundColor: "#006064",
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

function MoreThan2Rows(selectedRows){
  if(selectedRows != undefined){
    if(selectedRows.length > 1){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
};

export default function FullScreenQSDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //Werte Parameter
  var OI_O_NR = props.OI_O_NR;
  var order = props.order;
  var selectedRows = props.selectedRows;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button disabled={MoreThan2Rows(selectedRows)} variant="outlined" color="primary" onClick={handleClickOpen}> <ReplayIcon/>
      Retoure und Reklamation erfassen
      </Button>
      <Dialog fullScreen open={open} onClose={handleClickOpen} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Retoure und Reklamation erfassen
            </Typography>
          </Toolbar>
        </AppBar>
        <OrderHeader OI_O_NR={OI_O_NR} order={order}/>
        <RetoureReklamationCellEdittable OI_O_NR={OI_O_NR}/>
        <div className={classes.table}>
          <h2>Historie</h2>
          <RetoureHistoryTable OI_O_NR={OI_O_NR}/>
        </div>
      </Dialog>
    </div>
  );
}