import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const columns = ["Order. No.", "customer_name", "customer_type", "customer_number", "Order_date", "Summe_QTY", "Order_Status" ];

const data = [
["1", "Schnitzelwerk", "B","1", "15/2/2020", "5", "Versand"],
["2", "Christoph", "P","2", "15/2/2020", "5", "in Produktion"],
["3", "Rockcafe Altdorf", "B", "3", "15/2/2020", "5", "Retoure"],
["4", "Edeka", "B","4", "15/2/2020", "5", "QS"],
];

const options = {filterType: 'checkbox'};

const Homepage = () => {
    return (
        <div>
        <form >
          <div style={{ padding: "20px" }}>
            <h2>ERP System Verkauf und Versand 2021</h2>
            <h3>Startseite</h3>
          </div>

            <div style={{ padding: "20px", width:"800px", alignContent:"center", fontSize: 12}}>
              <FormControl>
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start">

                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Vorname*"
                        type="text"
                        name="firstName"
                        value=""
                        title= "Vorname des Kunden"/>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Nachname*"
                        type="text"
                        name="surName"
                        value=""
                        title="Nachname des Kunden"/>

                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Straße*"
                        type="text"
                        name="street"
                        value=""
                        title="Straße und Hausnummer" />
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Postleitzahl*"
                        type="number"
                        name="PostCode"
                        value=""
                        title="Postleitzahl der Stadt" />
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Stadt*"
                        type="text"
                        name="city"
                        value=""
                        title="Name der Stadt"/>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Land*"
                        type="text"
                        name="country"
                        value=""
                        title="Kürzel des Landes, z.B. Deutschland = DE"/>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Telefon*"
                        type="number"
                        name="phone"
                        value=""
                        title="Telefonnummer mit Länder- und Ortsvorwahl"/>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="E-Mail*"
                        type="text"
                        name="E-mail"
                        value=""
                        title="E-Mail-Adresse des Kunden"/>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Firma"
                        type="text"
                        name="company"
                        value=""
                        title="Firmenname, falls vorhanden"/>
                    </Grid>

                    <Grid item xs={6} sm={6} style={{ padding: "20px", width:"800px", alignContent:"center"}}>
                        {" "}
                        <input
                          type="radio"
                          value={true}
                          name="business"/> Kunde anlegen<br />   
                        {" "}
                        
                        <input
                          type="radio"
                          value={false}
                          name="business"/> Kundendetails anzeigen {" "}
                         </Grid>
                    </Grid>


                  <Grid item xs={12} sm={6}>
                      <br/>
                      <br/>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      title="Aufträge anzeigen / Kunde anlegen">
                        submit
                        </Button>
                  </Grid>
                </Grid>


                <div>
                  <h3>Bestätigung: </h3>
                </div>
              </FormControl>
            </div>
          </form>



<MUIDataTable
  title={"letzte Aufträge"}
  data={data}
  columns={columns}
  options={options}/>

 </div>





)



}

export default Homepage