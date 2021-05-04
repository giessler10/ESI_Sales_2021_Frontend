import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import testbild from './yourshirt_full.png';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  


const Dasboard = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
      <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6
          <Button a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md"> 
          <img src={testbild} width="200"></img>
          </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6
          <img src={testbild} width="200"></img>
          </Paper>
          
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6
          <img src={testbild} width="200"></img>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6
          <img src={testbild} width="200"></img>
          </Paper>
        </Grid>
        </Grid>

        </div>
    )
}

export default Dasboard