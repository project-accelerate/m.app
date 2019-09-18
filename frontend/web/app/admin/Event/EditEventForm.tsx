import React from 'react'
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
import { Validator } from 'frontend.web/app/admin/common/EditDialog/Validator'
import {
  EventFamily,
  getEventFamilyName,
  allEventFamilies,
} from 'common/domain/EventFamily'

interface EditEventFormProps {
  venueOptions: PickerOption[]
  speakerOptions: PickerOption[]
  title: string
  initial?: EditEventFormValue
  onSave: (data: EditEventFormChange) => Promise<void>
  onCancel: () => void
}

export interface EditEventFormValue {
  id: string
  name: string
  venue: string
  startTime: string
  endTime: string
  family: EventFamily
  introduction: string
  speakers: string[]
  detail: string
  photo: string | File | undefined
}

export interface EditEventFormChange {
  id: string
  name: string
  venue: string
  speakers: string[]
  startTime: string
  endTime: string
  family: EventFamily
  introduction: string
  detail: string
  photoUpload?: File
}

export class EditEventForm extends React.Component<EditEventFormProps> {
  get initialValues(): EditEventFormValue {
    return {
      id: '',
      name: '',
      venue: '',
      startTime: '',
      endTime: '',
      speakers: [],
      family: EventFamily.TWT,
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

  familyOptions = allEventFamilies.map(id => ({
    id,
    name: getEventFamilyName(id),
  }))

  render() {
    return (
      <EditDialog
        title={this.props.title}
        initial={this.initialValues}
        validate={{
          name: Validator.notEmpty('You must provide a name for the event'),
          venue: Validator.notEmpty('You must provide a venue for the event'),
          startTime: Validator.notEmpty(
            'You must provide a start time for the event',
          ),
          endTime: Validator.notEmpty(
            'You must provide an end time for the event',
          ),
          speakers: Validator.atLeastOne(
            'You must provide at least one speaker for the event',
          ),
          family: Validator.notEmpty(
            'You must say whether the event is for Labour conference or TWT',
          ),
          introduction: Validator.anything(),
          detail: Validator.anything(),
          photo: Validator.anything(),
        }}
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
            label="Conference"
            name="family"
            options={this.familyOptions}
            helperText="Conference that the event will be part of"
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
