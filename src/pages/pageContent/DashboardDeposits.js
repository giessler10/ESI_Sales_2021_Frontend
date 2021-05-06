import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
/*
function preventDefault(event) {
  event.preventDefault();
} */
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});
export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h2>Fehlerquote</h2>
      <Typography component="p" variant="h4">
        95%
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="/Orders" /*onClick={preventDefault}*/>
          Details anzeigen
        </Link>
      </div>
    </React.Fragment>
  );
}