import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Theme,
  createStyles,
  withStyles,
  Chip,
} from '@material-ui/core'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate'
import { keyBy, fromPairs } from 'lodash'

interface PickerProps {
  value: FieldState<string[]>
  options: PickerOption[]
}

interface PickerOption {
  id: string
  name: string
}

const styles = withStyles(({ spacing, typography }: Theme) => {
  const itemHeight = spacing.unit * 3
  const itemPaddingTop = spacing.unit / 2

  return createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: spacing.unit,
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: spacing.unit / 4,
    },
    menu: {
      maxHeight: itemHeight * 4.5 + itemPaddingTop,
      width: 250,
    },
    selectedItem: {
      fontWeight: typography.fontWeightMedium,
    },
    item: {
      fontWeight: typography.fontWeightRegular,
    },
  })
})

export const Picker = observer(
  styles<PickerProps>(function Picker({
    value: { value, onChange },
    options,
    classes,
  }) {
    const optionMap = keyBy(options, 'id')
    const selection = fromPairs(value.map(id => [id, true]))

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
        <Select
          multiple
          value={value}
          onChange={event => {
            onChange(event.currentTarget.value as any)
          }}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {value.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {options.map(option => (
            <MenuItem
              key={option.id}
              value={option.id}
              className={
                option.id in selection ? classes.selectedItem : classes.item
              }
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }),
)
