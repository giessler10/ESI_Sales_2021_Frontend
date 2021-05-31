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
import QSContent from './QSContent';
import ErrorIcon from '@material-ui/icons/Error';

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
  } 
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MoreThan2Rows(selectedRows){
  if(selectedRows.length > 1) 
    {return true;}
    return false;
};

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  var OI_O_NR = props.OI_O_NR;
  var selectedRows = props.selectedRows;

  return (
    <div>
      <Button disabled={MoreThan2Rows(selectedRows)} variant="outlined" color="primary" onClick={handleClickOpen}> <ErrorIcon/>
       QS
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Retoure
            </Typography>
          </Toolbar>
        </AppBar>
        <QSContent/>
      </Dialog>

    </div>
  );
}