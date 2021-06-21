import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    color: "black",

  },

  overflow:{
    overflow: "auto",
    padding: "20px"
  }

}));

export default function OrderHeader(props) {
  
  const classes = useStyles();

  return (
<div className={classes.root}>
<Paper style={{width:"650px", alignItems:"left"}}>   
    <Grid container spacing={3} >
    <Grid item xs={12} > <b style={{color:"#006064"}}>Kurzfarbwahl </b></Grid>
    <Grid item xs={4}> <b>Beschreibung </b></Grid>
    <Grid item xs={4}><b> Farbe </b></Grid>
    <Grid item xs={4}><b> Farbwert</b> </Grid>
    </Grid>
    
<Grid className={classes.overflow} style={{height:"200px"}}>
<Grid container spacing={3} style={{width:"600px"}}>
<Grid item xs>
        <TextField
               disabled
                defaultValue="Schneeweiß"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#FFFAFA", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#FFFAFA"/>       
</Grid></Grid>

<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Nachtschwarz"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#322E38", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#322E38"/>       
</Grid></Grid>

<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Wangenrot"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#B67CA2", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#B67CA2"/>       
</Grid></Grid>

<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Purpurrot "/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#6B1C23", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#6B1C23"/>       
</Grid></Grid>


<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Giftgrün"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#4DB560", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#4DB560"/>       
</Grid></Grid>



<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Grasgrün"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#35682D", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#35682D"/>       
</Grid></Grid>


<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Himmelblau"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#0088FF", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#0088FF"/>       
</Grid></Grid>


<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Malve"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#E0B0FF", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#E0B0FF"/>       
</Grid></Grid>


<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Petrol"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#005F6A", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#005F6A"/>       
</Grid></Grid>


<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="Sonnengelb"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#F39F18", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#F39F18"/>       
</Grid></Grid>


<Grid container spacing={3} style={{width:"600px"}}>
    <Grid item xs>
        <TextField
               disabled
                defaultValue="HSOG-blau"/>
    </Grid>
    <Grid item xs style={{backgroundColor:"#00286E", height:"40px", padding:"20px"}}>
    </Grid>
    <Grid item xs>
    <TextField
         InputProps={{
             readOnly: true,}}
        defaultValue="#00286E"/>       
</Grid></Grid>
</Grid>

</Paper>
</div>


    );
}