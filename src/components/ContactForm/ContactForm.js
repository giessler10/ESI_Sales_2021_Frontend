
import emailjs from 'emailjs-com';
import React, { useState } from "react";
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles,withStyles  } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
  gridStyle: {
   
    color: theme.palette.text.secondary,
    width: "200px",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}
));



export default function ContactUs() {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setSubmitted(false);
  };
  
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_rl1d4dr', 'template_52dzp7f', e.target, 'user_pGNVHHAn2C2tuEoosYCVi')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitted(true);
      e.target.reset();

    })
    .catch((err) => {
      console.log('FAILED...', err);
    });
  }

  return (
    <div className={classes.root}>
      <form className="contact-form" onSubmit={sendEmail}>
        <Paper className={classes.paper}>
          <Grid  container spacing={6} align="left">
            <Grid item sm={12} xs={12}>
              <input type="hidden" name="contact_form" value="YourShirt Support - Kontaktformular"/>
              <input type="hidden" name="modul_name" value="Verkauf und Versand"/>
              <input type="hidden" name="to_name" value="YourShirt Support"/>
              <label>Ihre Telefonnummer</label><br/>
              <input type="tel" name="contact_number" style={{width: "440px"}}/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <label>Ihr Name</label><br/>
              <input type="text" name="user_name" style={{width: "440px"}}/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <label>E-mail</label><br/>
              <input type="email" name="user_email" style={{width: "440px"}}/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <label>Ihre Nachricht</label><br/>
              <textarea name="message" style={{width: "440px", height: "100px"}}/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <input type="submit" value="Nachricht versenden" style={{width: "440px", height:"50px", background: "#006064", color: "#ffffff"}}/>
            </Grid>
          </Grid>
          {submitted && 
          <div style={{padding:"20px", fontSize:"18px", color:"#006064"}} class='success-message'>
            <Alert onClose={handleClose}> Nachricht übermittelt! Vielen Dank :)</Alert>
          </div>}
        </Paper>
      </form>
    </div>
  );
}