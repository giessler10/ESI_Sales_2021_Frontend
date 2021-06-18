import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function DashboardDepositsSumPrice(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h2>Umsatz</h2>
      <Typography component="p" variant="h4">
        {props.data} €
      </Typography>
    </React.Fragment>
  );
}