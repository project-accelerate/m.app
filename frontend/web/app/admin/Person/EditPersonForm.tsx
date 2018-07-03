import React from 'react'
import { EditDialog } from 'frontend.web/app/admin/common/EditDialog/EditDialog'
import {
  FormText,
  FormGrid,
  FormImage,
} from 'frontend.web/app/admin/common/FormInputText'
import { Validator } from 'frontend.web/app/admin/common/EditDialog/Validator'

interface EditPersonFormProps {
  title: string
  initial?: EditPersonFormValue
  onSave: (data: EditPersonFormChange) => void
  onCancel: () => void
}

interface EditPersonFormValue {
  name: string
  bio: string
  profilePic?: string | File
}

interface EditPersonFormChange {
  name: string
  bio: string
  photoUpload?: File
}

export class EditPersonForm extends React.Component<EditPersonFormProps> {
  handleSave = async ({ profilePic, ...value }: EditPersonFormValue) => {
    await this.props.onSave({
      ...value,
      photoUpload: profilePic instanceof File ? profilePic : undefined,
    })
  }

  get initialValues(): EditPersonFormValue {
    return {
      bio: '',
      name: '',
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
          name: Validator.notEmpty('You must provide a name for the speaker'),
          bio: Validator.anything(),
          profilePic: Validator.anything(),
        }}
      >
        <FormGrid>
          <FormImage
            name="profilePic"
            placeholder="Drop a profile picture for the speaker here"
          />
          <FormText
            fullWidth
            name="name"
            label="Name"
            helperText="Name of the speaker"
          />
          <FormText
            fullWidth
            multiline
            rows={15}
            name="bio"
            label="Bio"
            helperText="Short biography of the speaker"
          />
        </FormGrid>
      </EditDialog>
    )
  }
}
