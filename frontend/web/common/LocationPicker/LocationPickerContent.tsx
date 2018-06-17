import * as React from 'react'
import {
  withStyles,
  InputLabel,
  FormControl,
  Grid,
  Input,
  IconButton,
  Button,
  FormHelperText,
} from '@material-ui/core'
import { Search, MyLocation } from '@material-ui/icons'

interface LocationPickerContentProps {
  /** Current outcode/postcode */
  value: string

  /** Fired when edited postcode changes */
  onChange: React.ChangeEventHandler<HTMLInputElement>

  /** Fired to request commiting the edited postcode */
  onSubmit: React.FormEventHandler<{}>

  /** Fired to request using the user's location */
  onRequestGeolocation: () => void

  /** True if the postcode is invalid */
  error: boolean
}

const styles = withStyles(({ spacing }) => ({
  container: {
    margin: spacing.unit,
  },
  control: {
    margin: spacing.unit,
  },
}))

/**
 * View layer of LocationPicker
 */
export const LocationPickerContent = styles<LocationPickerContentProps>(
  ({ classes, value, error, onChange, onSubmit, onRequestGeolocation }) => (
    <form className={classes.container} onSubmit={onSubmit}>
      <Grid container alignItems="center" direction="row">
        <FormControl className={classes.control}>
          <InputLabel>Postcode</InputLabel>
          <Input
            value={value}
            onChange={onChange}
            inputProps={{ size: 8 }}
            error={error}
            endAdornment={
              <IconButton onClick={onSubmit}>
                <Search />
              </IconButton>
            }
          />
          {error && <FormHelperText>Invalid Postcode</FormHelperText>}
        </FormControl>
        <Button
          variant="raised"
          color="primary"
          className={classes.container}
          size="small"
        >
          <MyLocation />&nbsp;Use My Location
        </Button>
      </Grid>
    </form>
  ),
)
