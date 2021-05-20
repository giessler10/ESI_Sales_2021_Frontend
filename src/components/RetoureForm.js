import React from 'react';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles,withStyles  } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { green } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';




const options = {filterType: 'checkbox'};
const useStyles = makeStyles((theme) => ({
  gridStyle: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);



 

const SearchForm = () => {
    
  const [value, setValue] = React.useState('');
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

    return (
        <div>
         <form>        
            <div style={{ padding: "20px", alignContent:"center", fontSize: 12}}>
                  
          <FormControl className={classes.gridStyle}>
          <Grid container spacing={4}>
          <Grid item sm={12} xs={12}>
          <h2> </h2> 
          </Grid>

        <Grid item sm={6} xs={12}>

          <TextField
                        label="Kundennummer"
                        type="text"
                        name="kundennummer"
                        value=""
                        title= "Nummer des Kunden"/>
        </Grid>
        <Grid item sm={6} xs={12}>
            
          <TextField
                        label="Auftragsnummer"
                        type="text"
                        name="auftragsnummer"
                        value=""
                        title="Nummer des Auftrags"/>

        </Grid> 

        <Grid item sm={12} xs={12}>   
  
    <RadioGroup defaultValue="a" aria-label="gender" name="customized-radios">
    <FormControlLabel
      value="a"
      control={<GreenRadio />}
      label="nach Auftragsnummer suchen"/>
        <FormControlLabel
      value="k"
      control={<GreenRadio />}
      label="nach Kundennummer suchen"
    />
    </RadioGroup>
    </Grid>
      <Grid item xs={12}>
          <Button
                      style={{ background: "#006064", color: "#ffffff"}}
                      type="submit"
                      variant="contained"
                      title="suchen">
                        suchen
                        </Button>
        </Grid> 
     </Grid>
</FormControl>

</div>
</form>
</div>
)
}

export default SearchForm