import React from 'react'
import { EditDialog } from 'frontend.web/app/admin/common/EditDialog/EditDialog'
import {
  ConferenceNotificationScope,
  allConferenceNotificationScopes,
  getConferenceNotificationScopeLabel,
} from 'common/domain/ConferenceNotificationScope'
import {
  FormText,
  FormGrid,
  FormPicker,
  FormCheckbox,
} from 'frontend.web/app/admin/common/FormInputText'
import { Validator } from 'frontend.web/app/admin/common/EditDialog/Validator'
import { PickerOption } from 'frontend.web/app/admin/common/Picker/Picker'

interface EditNotificationFormProps {
  initial?: EditNotificationFormValue
  events: PickerOption[]
  onSave: (data: EditNotificationFormValue) => void
  onCancel: () => void
}

interface EditNotificationFormValue {
  title: string
  message: string
  detail: string
  urgent: boolean
  link?: string
  associatedEventId?: string
  scope: ConferenceNotificationScope
}

export class EditNotificationForm extends React.Component<
  EditNotificationFormProps
> {
  handleSave = async (value: EditNotificationFormValue) => {
    await this.props.onSave({
      ...value,
      link: value.link || undefined,
    })
  }

  get initialValues(): EditNotificationFormValue {
    return {
      title: '',
      message: '',
      urgent: false,
      detail: '',
      scope: ConferenceNotificationScope.TWT_ONLY,
      ...this.props.initial,
    }
  }

  get scopeOptions() {
    return allConferenceNotificationScopes.map(scope => ({
      id: scope,
      name: getConferenceNotificationScopeLabel(scope),
    }))
  }

  get associatedEventOptions() {
    return [{ id: undefined, name: 'None' }, ...this.props.events]
  }

  render() {
    return (
      <EditDialog
        title="Send Push Notification"
        initial={this.initialValues}
        onSubmit={this.handleSave}
        onCancel={this.props.onCancel}
        submitLabel="Send"
        validate={{
          title: Validator.notEmpty(
            'You must provide a title for the notification',
          ),
          message: Validator.notEmpty(
            'The notification must have a message body',
          ),
          link: Validator.optional(
            Validator.validUrl("This doesn't look like a valid link"),
          ),
        }}
      >
        <FormGrid>
          <FormPicker
            label="Notification Target"
            name="scope"
            options={this.scopeOptions}
            helperText="Who to send the notification to"
          />
          <FormText
            fullWidth
            name="title"
            label="Headline"
            inputProps={{ maxLength: 50 }}
            helperText="Headline of the notification"
          />
          <FormText
            fullWidth
            multiline
            rows={3}
            inputProps={{ maxLength: 140 }}
            name="message"
            label="Body"
            helperText="Short message with more information displayed in notification"
          />
          <FormText
            fullWidth
            multiline
            rows={7}
            name="detail"
            label="Body"
            helperText="Optional. Full article to display when user presses the notification"
          />
          <FormCheckbox
            name="urgent"
            label="Urgent"
            helperText="Should we make people's phones make a noise, etc?"
          />
        </FormGrid>
      </EditDialog>
    )
  }
}
