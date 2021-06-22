import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
        backgroundColor: theme.palette.background.paper,
        textColor: "green",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function OrderHeader(props) {

    const classes = useStyles();

    var OI_O_NR = props.OI_O_NR;
    var order = props.order;

    return (
        <div className={classes.root}>
            <br />
            <Grid xs={4}>
                <TextField
                    disabled
                    id="Bestellnummer"
                    label="Bestellnummer"
                    defaultValue={OI_O_NR}
                    variant="filled" />
                <TextField
                    disabled
                    id="Bestelldatum"
                    label="Bestelldatum"
                    defaultValue={order[3]}
                    variant="filled" />
                <br />
                <TextField
                    disabled
                    id="Kundennummer"
                    label="Kundennummer"
                    defaultValue={order[1]}
                    variant="filled" />
                <TextField
                    disabled
                    id="Kundentyp"
                    label="Kundentyp"
                    defaultValue={order[6]}
                    variant="filled" />
                <br />
                <TextField
                    disabled
                    id="Vorname"
                    label="Vorname"
                    defaultValue={order[8]}
                    variant="filled" />
                <TextField
                    disabled
                    id="Nachname"
                    label="Nachname"
                    defaultValue={order[9]}
                    variant="filled" />
                <br />
                <TextField
                    disabled
                    id="Auftragsstatus"
                    label="Auftragsstatus"
                    defaultValue={order[4]}
                    variant="filled" />
                <TextField
                    disabled
                    id="PLZ"
                    label="PLZ"
                    defaultValue={order[11]}
                    variant="filled" />
            </Grid>
        </div>
    );
}