import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const Customers = () => {
    return (
        <div>
            <div />
            <Typography paragraph>
                Übersicht Kunden
            </Typography>
            <Typography paragraph>
                Neuer Kunde2 anlegen!
 
                <Button variant="contained" color="primary">
                Neuer Kunde
                </Button>
            </Typography>
        </div>
    )
}

export default Customers