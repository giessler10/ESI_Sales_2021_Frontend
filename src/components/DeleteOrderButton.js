import React from 'react';
import {Button, FormControl, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  console.log(props.O_NR);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

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
          return res.body;
        }
    )
    .catch(
        (error) => {
          console.log(error);
          /*
            
            var errorObject = error.response.data;
            var errorMessage = errorObject.errorMessage;
            this.setState({ 
                errorObject: errorObject,
                errorMessage: errorMessage 
            });
            this.setState({ errorMessageVisible: true},()=>{ 
                    window.setTimeout(()=>{
                        this.setState({errorMessageVisible: false})
                    },5000);
                }
            )
          */
        }
    );
  };

  return (
    <div>
      <Button
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
            Möchten Sie den Auftrag wirklich löschen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Löschen
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}