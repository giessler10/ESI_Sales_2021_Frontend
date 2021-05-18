
import emailjs from 'emailjs-com';
import React, { useState } from "react";
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles,withStyles  } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';



const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  gridStyle: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "200px",
  },
}
));



export default function ContactUs() {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  
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
    <form className="contact-form" onSubmit={sendEmail}>
       <Grid container spacing={4} className={classes.gridStyle}>
          <Grid item sm={12} xs={12}>
              <input type="hidden" name="contact_form" value="YourShirt Support - Kontaktformular"/>
              <input type="hidden" name="modul_name" value="Verkauf und Versand"/>
              <input type="hidden" name="to_name" value="YourShirt Support"/>
            <label>Ihre Telefonnummer</label>
            <input type="tel" name="contact_number" style={{width: "200px"}}/>
         </Grid>
          <Grid item sm={12} xs={12}>
            <label>Ihr Name</label>
            <input type="text" name="user_name" style={{width: "200px"}}/>
          </Grid>
          <Grid item sm={12} xs={12}>
            <label>E-mail</label>
            <input type="email" name="user_email" style={{width: "200px"}}/>
          </Grid>
          <Grid item sm={12} xs={12}>
            <label>Ihre Nachricht</label>
            <textarea name="message" style={{width: "370px", height: "100px"}}/>
          </Grid>
          <Grid item sm={12} xs={12}>
            <input type="submit" value="Nachricht versenden" style={{width: "370px", height:"50px", background: "#006064", color: "#ffffff"}}/>
          </Grid>
          
      </Grid>
      {submitted && <div style={{padding:"20px", fontSize:"18px", color:"#006064"}} class='success-message'>
      
        <Alert onClose={() => {}}> Nachricht übermittelt! Vielen Dank :)</Alert>

        </div>}
    </form>
    
  );
}

