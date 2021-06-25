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
import QSHistoryTable from './QSHistoryTable';
import RetoureHistoryTable from './RetoureHistoryTable';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    //flexGrow: 1,
    overflow: 'auto',
    width: '100%',
    //backgroundColor: theme.palette.background.paper,
    //textColor: "green",
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
  },
  table: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  content: {
    display: 'block'
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
    <div className={classes.root}>
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
        <div className={classes.table}>
          <OrderHeader OI_O_NR={OI_O_NR} order={order} />
        </div>
        <div className={classes.table}>
          <h2>Auftragspositionen</h2>
          <OrderPositionsTable OI_O_NR={OI_O_NR}></OrderPositionsTable>
        </div>
        <div className={classes.table}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Probleme mit Qualitätssicherung</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.content}>
              <Typography>
                <QSHistoryTable OI_O_NR={OI_O_NR} />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Probleme mit Retoure und Reklamation</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.content}>
              <Typography>
                <RetoureHistoryTable OI_O_NR={OI_O_NR} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Dialog>
    </div>
  );
}