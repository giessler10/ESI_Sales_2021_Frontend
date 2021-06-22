import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import AllInboxIcon from '@material-ui/icons/AllInbox';

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/


export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("Sie sind sich sicher, die selektierten Aufträge vom Lager bereitstellen zu lassen?");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAbort = () => {
    setOpen(false);
  };

  //Check if database is offline (AWS)
  const IsDataBaseOffline = (res) => {
    if (res.data.errorMessage == null) return false;
    if (res.data.errorMessage === 'undefined') return false;
    if (res.data.errorMessage.endsWith("timed out after 3.00 seconds")) {
      return true;
    }
    return false;
  }

  const handleCloseConfirm = () => {
    //Aufträge vom Lager bereitstellen lassen
    axios.post('https://9j8oo3h3yk.execute-api.eu-central-1.amazonaws.com/Main/insertauslagerungvv', props.body)
      .then(
        (res) => {
          if (IsDataBaseOffline(res)) {
            setText("Die selektierten Aufträge konnten nicht an das Lager übergeben werden. Die Datenbank der Materialwirtschaft ist offline.");
          }
          else {
            setOpen(false);
          }
          return res.data;
        }
      )
      .catch(
        (error) => {
          var errorObject = error.response.data;
          var errorMessage = errorObject.errorMessage;
          console.log(errorMessage);

          //Error-Handling - DB Produktion nicht online
          setText("Die selektierten Aufträge konnten nicht an das Lager übergeben werden." + errorMessage);
        }
      );
  };

  return (
    <div>
      <Button
        color="primary"
        type="submit"
        variant="outlined"
        onClick={handleClickOpen}
        title="Produktionsauftrag">
        <AllInboxIcon />
        Vom Lager bereitstellen
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Vom Lager bereitstellen?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Bereitstellen
          </Button>
          <Button onClick={handleCloseAbort} color="secondary" autoFocus>
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}