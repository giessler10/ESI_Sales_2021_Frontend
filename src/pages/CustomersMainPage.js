import React from 'react';
import { Typography, Button, FormControl, Grid, TextField } from '@material-ui/core';

const Customers = () => {
    return (
        <div>
          <form>
            <div style={{ padding: "20px" }}>
              <h2>Neuen Kunden anlegen</h2>
            </div>

            <div style={{ width: "800px", padding: "20px" }}>
              <FormControl>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Vorname*"
                        type="text"
                        name="firstName"
                        value=""
                        title= "Vorname des Kunden"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Nachname*"
                        type="text"
                        name="surName"
                        value=""
                        title="Nachname des Kunden"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Straße*"
                        type="text"
                        name="street"
                        value=""
                        title="Straße und Hausnummer"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Postleitzahl*"
                        type="number"
                        name="PostCode"
                        value=""
                        title="Postleitzahl der Stadt"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Stadt*"
                        type="text"
                        name="city"
                        value=""
                        title="Name der Stadt"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Land*"
                        type="text"
                        name="country"
                        value=""
                        title="Kürzel des Landes, z.B. Deutschland = DE"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Telefon*"
                        type="number"
                        name="phone"
                        value=""
                        title="Telefonnummer mit Länder- und Ortsvorwahl"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Mail*"
                        type="text"
                        name="mail"
                        value=""
                        title="E-Mail-Adresse des Kunden"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <div>
                        {" "}
                        Geschäftskunde <br />
                        <input
                          type="radio"
                          value={true}
                          name="business"
                          //defaultChecked
                        /> Ja <br />
                        <input
                          type="radio"
                          value={false}
                          name="business"
                        />{" "}
                        Nein
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Firma"
                        type="text"
                        name="company"
                        value=""
                        title="Firmenname, falls vorhanden"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      title="Kunde zur Kundendatenbank hinzufügen"
                    >
                      Kunden speichern
                    </Button>
                  </Grid>
                </Grid>
                <div>
                  <h3>Bestätigung: </h3>
                </div>
              </FormControl>
            </div>
          </form>
        </div>
    )
}

export default Customers