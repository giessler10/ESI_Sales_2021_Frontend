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
import DescriptionIcon from '@material-ui/icons/Description';
import OrderPositionsTable from './orderPositionsTable.js';
import OrderHeader from './OrderHeader';

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


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
    color: theme.palette.text.secondary,
  },
  table: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%'
  }
}));

function MoreThan2Rows(selectedRows) {
  if (selectedRows.length > 1) { return true; }
  return false;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogOrderDetails(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
      <Button disabled={MoreThan2Rows(selectedRows)} variant="outlined" color="primary" onClick={handleClickOpen}> <DescriptionIcon />
        Auftragdetails
      </Button>
      <Dialog fullScreen open={open} onClose={handleClickOpen} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Auftragdetails
            </Typography>
          </Toolbar>
        </AppBar>
        <OrderHeader OI_O_NR={OI_O_NR} order={order} />
        <div className={classes.table}>
          <h2>Auftragspositionen</h2>
          <OrderPositionsTable OI_O_NR={OI_O_NR}></OrderPositionsTable>
        </div>
      </Dialog>
    </div>
  );
}