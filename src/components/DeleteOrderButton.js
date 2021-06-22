import React from 'react';
import {Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("Möchten Sie den Auftrag wirklich löschen?");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleCloseAbort = () => {
    setOpen(false);
  }

  const handleCloseConfirm = () => {
    //Auftrag löschen
    axios.delete('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/' + props.O_NR)
    .then(
        (res) => {
            console.log(res.status);
            return res.data;
        }
    )
    .then(
        (res) => {
          setOpen(false);
        }
    )
    .catch(
      (error) => {
        var errorObject = error.response.data;
        var errorMessage = errorObject.errorMessage;
        console.log(errorMessage);

        //Error-Handling - DB offline
        setText("Fehler beim Löschen des Auftrags! " + errorMessage);
      }
    );
  };

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

  return (
    <div>
      <Button
        disabled={MoreThan2Rows(props.selectedRows)}
        color ="primary"
        type="submit"
        variant="outlined"
        onClick={handleClickOpen}
        title="Produktionsauftrag">
          <DeleteIcon />
        Löschen
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Auftrag löschen?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Löschen
          </Button>
          <Button onClick={handleCloseAbort} color="secondary" autoFocus>
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}