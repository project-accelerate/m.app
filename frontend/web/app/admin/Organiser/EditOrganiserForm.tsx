import React from 'react'
import Async from 'react-promise'
import { observer } from 'mobx-react'
import { FormState, FieldState } from 'formstate'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Dropzone, { ImageFile } from 'react-dropzone'
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core'
import {
  ImageWell,
  ImageWellValue,
} from 'frontend.web/app/common/ImageWell/ImageWell'
import { mapValues } from 'lodash'
import { toDataUri } from 'frontend.web/utils'
import { EditDialog } from 'frontend.web/app/admin/common/EditDialog/EditDialog'

interface EditOrganiserFormProps {
  title: string
  initial?: EditOrganiserFormValue
  onSave: (data: EditOrganiserFormChange) => void
  onCancel: () => void
}

interface EditOrganiserFormValue {
  name: string
  bio: string
  profilePic?: string
}

interface EditOrganiserFormChange {
  name: string
  bio: string
  photoUpload?: File
}

export class EditOrganiserForm extends React.Component<EditOrganiserFormProps> {
  initial: Partial<EditOrganiserFormValue> = this.props.initial || {}

  form = new FormState({
    name: new FieldState(this.initial.name || ''),
    bio: new FieldState(this.initial.bio || ''),
    profilePic: new FieldState<ImageWellValue>(this.initial.profilePic),
  })

  handleSave = async () => {
    const result = await this.form.validate()

    if (!result.hasError) {
      const { name, bio, profilePic } = result.value

      this.props.onSave({
        name: name.value,
        bio: bio.value,
        photoUpload:
          profilePic.value instanceof File ? profilePic.value : undefined,
      })
    }
  }

  render() {
    return (
      <EditDialog
        title={this.props.title}
        onSubmit={this.handleSave}
        onCancel={this.props.onCancel}
      >
        <Grid container direction="column" xs={12} spacing={16}>
          <Grid item>
            <ImageWell
              image={this.form.$.profilePic}
              placeholder="Drop a profile picture for the speaker here"
            />
          </Grid>
          <Grid item>
            <FormInputText
              fullWidth
              label="Name"
              helperText="Name of the speaker"
              data={this.form.$.name}
            />
          </Grid>
          <Grid item>
            <FormInputText
              fullWidth
              multiline
              rows={10}
              inputProps={{ style: { minHeight: 300 } }}
              label="Biography"
              helperText="Short biography of the speaker"
              data={this.form.$.bio}
            />
          </Grid>
        </Grid>
      </EditDialog>
    )
  }
}

interface FormInputProps<T> extends TextFieldProps {
  data: FieldState<T>
}

const FormInputText = observer(function FormInputText(
  props: FormInputProps<string>,
) {
  return (
    <TextField
      {...props}
      value={props.data.value}
      onChange={event => props.data.onChange(event.currentTarget.value)}
    />
  )
})
