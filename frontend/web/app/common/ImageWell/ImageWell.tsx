import React from 'react'
import Async from 'react-promise'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate'
import Dropzone, { ImageFile } from 'react-dropzone'
import {
  WithStyles,
  withStyles,
  createStyles,
  InputLabel,
  Typography,
  Theme,
  IconButton,
  Toolbar,
  Button,
} from '@material-ui/core'
import { AddAPhoto, Portrait } from '@material-ui/icons'
import classnames from 'classnames'

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    dropzone: {
      cursor: 'pointer',
      border: 'none',
    },
    image: {
      objectFit: 'cover',
      border: 'none',
      margin: 0,
      opacity: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      transition: 'opacity 200ms ease-in-out',
    },
    placeholder: {
      opacity: 1,
      color: palette.grey[600],
      transition: 'opacity 200ms ease-in-out',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      textAlign: 'center',
    },
    toolbar: {
      position: 'absolute',
      width: '100%',
      left: 0,
      bottom: 0,
      justifyContent: 'flex-end',
    },
    wrapper: {
      position: 'relative',
      minHeight: 300,
    },
    hasImage: {
      '& $image': {
        opacity: 1,
      },
      '& $placeholder': {
        opacity: 0,
      },
    },
  })

interface ImageWellProps extends WithStyles<typeof styles> {
  image: FieldState<ImageWellValue>
  placeholder?: React.ReactNode
}

export type ImageWellValue = File | string | undefined

@observer
class _ImageWell extends React.Component<ImageWellProps> {
  static displayName = 'ImageWell'

  get imageData() {
    const image = this.props.image.value

    if (!image) {
      return Promise.resolve(undefined)
    }

    if (typeof image === 'string') {
      return Promise.resolve(image)
    }

    return toDataUri(image)
  }

  handleDrop = (files: ImageFile[]) => {
    if (files[0]) {
      this.props.image.onChange(files[0])
    }
  }

  render() {
    const { classes, children, placeholder = 'Upload an image' } = this.props

    return (
      <Dropzone className={classes.dropzone} onDrop={this.handleDrop}>
        <Async
          promise={this.imageData}
          then={data => (
            <div
              className={classnames(classes.wrapper, {
                [classes.hasImage]: !!data,
              })}
            >
              <img className={classes.image} src={data} />

              <Placeholder />

              <Toolbar className={classes.toolbar}>
                {children}
                <Button mini variant="fab">
                  <AddAPhoto />
                </Button>
              </Toolbar>
            </div>
          )}
        />
      </Dropzone>
    )

    function Placeholder() {
      return (
        <div className={classes.placeholder}>
          <Portrait />
          <Typography color="textSecondary" variant="caption">
            {placeholder}
          </Typography>
        </div>
      )
    }
  }
}

function toDataUri(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

export const ImageWell = withStyles(styles)(_ImageWell)
