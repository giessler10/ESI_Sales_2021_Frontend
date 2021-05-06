import React from 'react';
import { Typography, Button, FormControl, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Box from '@material-ui/core/Box';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';

//Testtabelle Aufbau
const columns = ["Order. No.", "customer_name", "customer_type", "customer_number", "Order_date", "Summe_QTY", "Order_Status" ];

const data = [
["1", "Schnitzelwerk", "B","1", "15/2/2020", "5", "Versand"],
["2", "Christoph", "P","2", "15/2/2020", "5", "in Produktion"],
["3", "Rockcafe Altdorf", "B", "3", "15/2/2020", "5", "Retoure"],
["4", "Edeka", "B","4", "15/2/2020", "5", "QS"],
];

//Testtabelle aufbau ende

const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Neuen Kunden anlegen" icon={<PersonPinIcon />} {...a11yProps(2)} />
          <Tab label="Letzte Aufträge" icon={<HelpIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        
        <div>
          <form>
            <div >
              <h2 >Neuen Kunden anlegen</h2>
            </div>
            <div style={{ width: "800px", padding: "20px" }}>
              <FormControl>
                <Grid container direction="row" justify="center" alignItems="flex-start">
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
              </FormControl>
            </div>
          </form>
        </div>  
      
    </TabPanel>
    <TabPanel value={value} index={1}>
        <div>
          <Grid item xs={12}>
            <Paper className={classes.paper}> 
            <h2> Kundendetails: letzte Aufträge </h2>
            </Paper>
          </Grid>

          <MUIDataTable
            data={data}
            columns={columns}
            options={options}/>
        </div>
      </TabPanel>
    </div>
)

}
