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
} from '@material-ui/core'
import { ImageWell } from 'frontend.web/app/common/ImageWell/ImageWell'

interface EditOrganiserFormProps {
  initial?: EditOrganiserFormData
}

interface EditOrganiserFormData {
  name: string
  bio: string
  profilePic?: string
}

export class EditOrganiserForm extends React.Component<EditOrganiserFormProps> {
  initial: Partial<EditOrganiserFormData> = this.props.initial || {}

  form = new FormState({
    name: new FieldState(this.initial.name || ''),
    bio: new FieldState(this.initial.bio || ''),
    profilePic: new FieldState(this.initial.profilePic),
  })

  handleSave = async () => {
    const result = await this.form.validate()

    if (!result.hasError) {
      const { name, bio, profilePic } = result.value
      const photoUpload = isBlob(profilePic.value)
        ? await toDataUri(profilePic.value)
        : undefined

      this.props.onSave({
        name: name.value,
        bio: bio.value,
        photoUpload,
      })
    }
  }

  render() {
    return (
      <form>
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
          <Grid item container justify="flex-end">
            <Button variant="text" color="secondary">
              Cancel
            </Button>
            <Button variant="text" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
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
