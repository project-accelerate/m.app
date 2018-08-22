import React from 'react'
import {
  WithStyles,
  withStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import { contentWidth } from 'frontend.web/app/common/Layouts'
import { LoadingIndicator } from 'frontend.web/app/common/LoadData/LoadingIndicator'
import { Formik } from 'formik'
import { Validator } from 'frontend.web/app/admin/common/EditDialog/Validator'
import { forEach, isEmpty } from 'lodash'

const styles = () =>
  createStyles({
    content: {
      width: contentWidth,
    },
    loadingOverlay: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
  })

interface EditDialogProps<T> {
  title: string
  initial: T
  validate: { [P in keyof Partial<T>]: Validator<T[P]> }
  submitLabel?: string
  onSubmit: (value: T) => Promise<void>
  onCancel: () => void
}

type EditDialogClass = new <T>(props: EditDialogProps<T>) => React.Component<
  EditDialogProps<T>
>

export const EditDialog = withStyles(styles)(
  class EditDialog<T> extends React.Component<
    EditDialogProps<T> & WithStyles<typeof styles>
  > {
    state = { busy: false }

    handleSubmit = async (value: T) => {
      try {
        this.setState({ busy: true })
        await this.props.onSubmit(value)
      } finally {
        this.setState({ busy: false })
      }
    }

    validate(values: any) {
      const errors: any = {}

      forEach(this.props.validate, (validate: Validator<any>, key) => {
        const result = validate(values[key])
        if (result !== true) {
          errors[key] = result
        }
      })

      return errors
    }

    render() {
      const { classes } = this.props

      return (
        <Formik
          initialValues={this.props.initial}
          onSubmit={this.handleSubmit}
          validate={values => this.validate(values)}
          render={({ submitForm, values }) => (
            <Dialog open onClose={this.props.onCancel} fullWidth>
              <DialogTitle>{this.props.title}</DialogTitle>

              <DialogContent>{this.props.children}</DialogContent>

              <DialogActions>
                <Button
                  onClick={this.props.onCancel}
                  variant="text"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  disabled={!isEmpty(this.validate(values))}
                  onClick={submitForm}
                  variant="raised"
                  color="primary"
                >
                  {this.props.submitLabel || 'Save'}
                </Button>
              </DialogActions>

              {this.state.busy && (
                <div className={classes.loadingOverlay}>
                  <LoadingIndicator message="Saving..." />
                </div>
              )}
            </Dialog>
          )}
        />
      )
    }
  },
) as EditDialogClass
