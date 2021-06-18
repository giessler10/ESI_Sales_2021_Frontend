import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function DashboardDepositsSumReturnQTY(props) {
  const classes = useStyles();

  var percent = "Fehler"

  if(props.data != 0 & props.allData !=0){
      var precentData = Math.round((props.data / props.sumQTY), 2);
      var precentData = (props.data / props.sumQTY)*100;
      percent = precentData.toFixed(2) + "%";
  }

  return (
    <React.Fragment>
      <h2>Retournierte Ware</h2>
      <Typography component="p" variant="h4">
        {props.data}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {percent} der Bestellmenge
      </Typography>
    </React.Fragment>
  );
}