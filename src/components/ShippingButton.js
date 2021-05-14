import React from 'react';
import {Button, FormControl, Grid} from '@material-ui/core';

const ShippingButton = () => {
  return (
    <div>
      <form>
        <div>
          <FormControl>
            <Grid item xs={12}>
              <Button
                style={{ background: "#006064", color: "#ffffff"}}
                type="submit"
                variant="contained"
                title="Kundendetails abfragen">
                weg damit
              </Button>
            </Grid>
          </FormControl>
        </div>
      </form>
    </div>
    )
};
            
export default ShippingButton