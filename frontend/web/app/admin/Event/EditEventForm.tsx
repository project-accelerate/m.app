import React from 'react'
import { Grid } from '@material-ui/core'
import { EditDialog } from 'frontend.web/app/admin/common/EditDialog/EditDialog'
import {
  FormText,
  FormImage,
  FormGrid,
  FormPicker,
  FormDateTime,
  FormMultiPicker,
} from 'frontend.web/app/admin/common/FormInputText'
import { PickerOption } from 'frontend.web/app/admin/common/Picker/Picker'

interface EditEventFormProps {
  venueOptions: PickerOption[]
  speakerOptions: PickerOption[]
  title: string
  initial?: EditEventFormValue
  onSave: (data: EditEventFormChange) => Promise<void>
  onCancel: () => void
}

export interface EditEventFormValue {
  name: string
  venue: string
  startTime: string
  endTime: string
  introduction: string
  speakers: string[]
  detail: string
  photo: string | File | undefined
}

export interface EditEventFormChange {
  name: string
  venue: string
  speakers: string[]
  startTime: string
  endTime: string
  introduction: string
  detail: string
  photoUpload?: File
}

export class EditEventForm extends React.Component<EditEventFormProps> {
  get initialValues(): EditEventFormValue {
    return {
      name: '',
      venue: '',
      startTime: '',
      endTime: '',
      speakers: [],
      introduction: '',
      detail: '',
      photo: '',
      ...this.props.initial,
    }
  }

  handleSave = async ({ photo, ...props }: EditEventFormValue) => {
    await this.props.onSave({
      ...props,
      photoUpload: photo instanceof File ? photo : undefined,
    })
  }

  render() {
    return (
      <EditDialog
        title={this.props.title}
        initial={this.initialValues}
        onSubmit={this.handleSave}
        onCancel={this.props.onCancel}
      >
        <FormGrid>
          <FormImage
            name="photo"
            placeholder="Drop an image to display for the event here"
          />
          <FormText
            fullWidth
            name="name"
            label="Name"
            helperText="Name of the event"
          />
          <FormPicker
            label="Venue"
            name="venue"
            options={this.props.venueOptions}
          />
          <FormMultiPicker
            label="Speakers"
            name="speakers"
            options={this.props.speakerOptions}
          />
          <FormDateTime
            label="Start Time"
            name="startTime"
            fullWidth
            disablePast
            placeholder="Start time & day of the event"
          />
          <FormDateTime
            label="End Time"
            name="endTime"
            fullWidth
            disablePast
            placeholder="End time & day of the event"
          />
          <FormText
            fullWidth
            name="introduction"
            label="Introduction"
            helperText="Brief overview of the event displayed in listings"
            multiline
            rows={5}
          />
          <FormText
            fullWidth
            name="detail"
            label="Detail"
            helperText="Detailed description of the event"
            multiline
            rows={10}
          />
        </FormGrid>
      </EditDialog>
    )
  }
}
