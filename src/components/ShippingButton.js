import React from 'react';
import {Button, FormControl, Grid} from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const ShippingButton = () => {
  return (
    <div>
      <form>
        <div>
          <FormControl>
            <Grid item xs={12}>
              <Button
                color="primary"
                type="submit"
                variant="outlined"
                title="Kundendetails abfragen">
                 <LocalShippingIcon/>
                Versand
              </Button>
            </Grid>
          </FormControl>
        </div>
      </form>
    </div>
    )
};
            
export default ShippingButton