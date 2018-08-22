import React from 'react'
import {
  TextField,
  Grid,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel,
} from '@material-ui/core'
import { Field } from 'formik'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DateFnsUtils from 'material-ui-pickers/utils/moment-utils'
import { DateTimePicker } from 'material-ui-pickers'
import { ImageWell } from 'frontend.web/app/common/ImageWell/ImageWell'
import { TextFieldProps } from '@material-ui/core/TextField'
import {
  PickerOption,
  Picker,
  MultiPicker,
} from 'frontend.web/app/admin/common/Picker/Picker'
import { DateTimePickerWrapperProps } from 'material-ui-pickers/DateTimePicker/DateTimePickerWrapper'

interface FormInputProps<T> {
  helperText?: string
  label?: string
  placeholder?: string
  name: string
}

export function FormText(props: FormInputProps<string> & TextFieldProps) {
  const { helperText, label, placeholder, name, ...fieldConfig } = props
  return (
    <Field
      name={name}
      render={({ field, form }) => (
        <TextField
          {...field}
          {...fieldConfig}
          placeholder={placeholder}
          label={label}
          helperText={form.errors[name] || helperText}
          error={Boolean(form.errors[name])}
        />
      )}
    />
  )
}

export function FormImage(props: FormInputProps<File | string | undefined>) {
  return (
    <Field
      name={props.name}
      render={({ form, field }) => (
        <ImageWell
          value={field.value}
          onChange={value => form.setFieldValue(props.name, value)}
          placeholder={props.placeholder}
        />
      )}
    />
  )
}

interface FormPickerProps extends FormInputProps<string> {
  options: PickerOption[]
}

export function FormPicker({
  name,
  options,
  helperText,
  ...pickerProps
}: FormPickerProps) {
  return (
    <Field
      name={name}
      render={({ form, field }) => (
        <Picker
          {...pickerProps}
          helperText={form.errors[name] || helperText}
          error={Boolean(form.errors[name])}
          options={options}
          value={field.value}
          onChange={value => form.setFieldValue(name, value)}
        />
      )}
    />
  )
}

interface FormMultiPickerProps extends FormInputProps<string[]> {
  options: PickerOption[]
}

export function FormMultiPicker({
  name,
  options,
  helperText,
  ...pickerProps
}: FormMultiPickerProps) {
  return (
    <Field
      name={name}
      render={({ form, field }) => (
        <MultiPicker
          {...pickerProps}
          helperText={form.errors[name] || helperText}
          error={Boolean(form.errors[name])}
          options={options}
          value={field.value || []}
          onChange={value => form.setFieldValue(name, value)}
        />
      )}
    />
  )
}

interface FormCheckboxProps extends FormInputProps<boolean> {}

export function FormCheckbox({ name, helperText, label }: FormCheckboxProps) {
  return (
    <Field
      name={name}
      render={({ form, field }) => (
        <FormControl component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                value={field.value}
                onChange={value => form.setFieldValue(name, value)}
              />
            }
            label={label}
          />
          <FormHelperText error={Boolean(form.errors[name])}>
            {form.errors[name] || helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

interface FormDateTimeProps extends Partial<DateTimePickerWrapperProps> {
  name: string
}

export function FormDateTime({
  name,
  helperText,
  ...pickerProps
}: FormDateTimeProps) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Field
        name={name}
        render={({ form, field }) => (
          <DateTimePicker
            {...pickerProps}
            helperText={form.errors[name] || helperText}
            error={Boolean(form.errors[name])}
            value={field.value}
            onChange={value => form.setFieldValue(name, value)}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  )
}

interface FormGridProps<T> {
  children?: React.ReactElement<{}>[]
}

export function FormGrid<T>(props: FormGridProps<T>) {
  return (
    <Grid container direction="column" spacing={16}>
      {props.children &&
        props.children.map((field, i) => (
          <Grid key={field.key || i} item xs={12}>
            {field}
          </Grid>
        ))}
    </Grid>
  )
}
