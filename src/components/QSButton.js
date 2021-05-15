import React from 'react';
import {Button, FormControl, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        style={{ background: "#006064", color: "#ffffff"}}
        type="submit"
        variant="contained"
        onClick={handleClickOpen}
        title="Kundendetails abfragen">
        QS melden
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Die Ware als fehlerhaft einstufen?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Melden Sie QS-Probleme und stufen die Ware als fehlerhaft ein, so wird der Posten aus den versandbereiten Aufträgen entfernt und erneut in Produktion gegeben.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ware umbuchen
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}