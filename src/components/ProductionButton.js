import React from 'react';
import {Button, FormControl, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color ="primary"
        type="submit"
        variant="outlined"
        onClick={handleClickOpen}
        title="Produktionsauftrag">
          <PlayCircleFilledWhiteIcon />
        Auftrag an Produktion geben
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Auftrag an die Produktion geben?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sie sind sich sicher, dass der Auftrag vollständig ist und der Produktion weitergereicht werden kann?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Auftrag absenden
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}