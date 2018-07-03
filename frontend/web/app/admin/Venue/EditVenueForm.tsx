import React from 'react'
import { EditDialog } from 'frontend.web/app/admin/common/EditDialog/EditDialog'
import { AddressEditorFragment } from 'frontend.web/queries'
import {
  FormText,
  FormGrid,
  FormImage,
} from 'frontend.web/app/admin/common/FormInputText'
import { Validator } from 'frontend.web/app/admin/common/EditDialog/Validator'

interface EditVenueFormProps {
  title: string
  initial?: Partial<EditVenueFormValue>
  onSave: (data: EditVenueFormChange) => Promise<void>
  onCancel: () => void
}

export interface EditVenueFormValue extends AddressEditorFragment {
  name: string
  description: string
  photo: string | File | undefined
}

export interface EditVenueFormChange extends AddressEditorFragment {
  name: string
  description: string
  photoUpload?: File
}

export class EditVenueForm extends React.Component<EditVenueFormProps> {
  handleSave = async ({ photo, ...value }: EditVenueFormValue) => {
    await this.props.onSave({
      ...value,
      photoUpload: photo instanceof File ? photo : undefined,
    })
  }

  get initialValues(): EditVenueFormValue {
    return {
      name: '',
      description: '',
      streetAddress: '',
      city: '',
      postcode: '',
      photo: undefined,
      ...this.props.initial,
    }
  }

  render() {
    return (
      <EditDialog
        title={this.props.title}
        initial={this.initialValues}
        onSubmit={this.handleSave}
        onCancel={this.props.onCancel}
        validate={{
          name: Validator.notEmpty('You must provide a name for the venue'),
          description: Validator.anything(),
          streetAddress: Validator.notEmpty(
            'You must provide an address for the venue',
          ),
          city: Validator.notEmpty('You must provide a city for the venue'),
          postcode: Validator.isValidPostcode(
            'You must provide valid postcode for the venue',
          ),
          photo: Validator.anything(),
        }}
      >
        <FormGrid>
          <FormImage
            name="photo"
            placeholder="Drop an image of the venue here"
          />
          <FormText
            name="name"
            fullWidth
            label="Name"
            helperText="Name of the venue to display on events"
          />
          <FormText
            name="description"
            fullWidth
            multiline
            rows={5}
            label="Description"
            helperText="Description of the venue"
          />
          <FormText
            name="streetAddress"
            fullWidth
            multiline
            rows={3}
            label="Street Address"
          />
          <FormText name="city" fullWidth label="City" />
          <FormText name="postcode" fullWidth label="Postcode" />
        </FormGrid>
      </EditDialog>
    )
  }
}
