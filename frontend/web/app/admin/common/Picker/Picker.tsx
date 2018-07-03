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
  FormHelperText,
} from '@material-ui/core'
import { keyBy, fromPairs } from 'lodash'

interface PickerProps {
  label?: string
  error?: boolean
  helperText?: string
  value: string | undefined
  onChange: (value: string) => void
  options: PickerOption[]
}

interface MultiPickerProps {
  label?: string
  error?: boolean
  helperText?: string
  value: string[]
  onChange: (value: string[]) => void
  options: PickerOption[]
}

export interface PickerOption {
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

export const Picker = styles<PickerProps>(function Picker({
  label,
  value,
  onChange,
  options,
  classes,
  error,
  helperText,
}) {
  const optionMap = keyBy(options, 'id')

  return (
    <FormControl fullWidth error={error}>
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        value={value}
        onChange={event => {
          onChange(event.target.value)
        }}
        input={<Input id="select" />}
        renderValue={() => value && optionMap[value].name}
      >
        {options.map(option => (
          <MenuItem
            key={option.id}
            value={option.id}
            className={
              option.id === value ? classes.selectedItem : classes.item
            }
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
})

export const MultiPicker = styles<MultiPickerProps>(function MultiPicker({
  label,
  value,
  onChange,
  options,
  classes,
  error,
  helperText,
}) {
  const optionMap = keyBy(options, 'id')
  const selection = fromPairs(value.map(id => [id, true]))

  return (
    <FormControl fullWidth error={error}>
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={event => {
          onChange(event.target.value as any)
        }}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {value.map(value => (
              <Chip
                key={value}
                label={optionMap[value].name}
                className={classes.chip}
              />
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
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
})
