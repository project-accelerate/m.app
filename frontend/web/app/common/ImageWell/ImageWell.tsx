import React from 'react'
import Dropzone, { ImageFile } from 'react-dropzone'
import {
  WithStyles,
  withStyles,
  createStyles,
  Typography,
  Theme,
  Toolbar,
  Button,
} from '@material-ui/core'
import { AddAPhoto, Portrait } from '@material-ui/icons'
import classnames from 'classnames'
import { toDataUri } from 'frontend.web/utils'

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
      height: 400,
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
  value: string | File | undefined
  onChange: (value: File) => void
  placeholder?: React.ReactNode
}

interface ImageWellState {
  imageData?: string
}

class _ImageWell extends React.Component<ImageWellProps, ImageWellState> {
  static displayName = 'ImageWell'

  state: ImageWellState = {
    imageData:
      typeof this.props.value === 'string' ? this.props.value : undefined,
  }

  componentDidMount() {
    this.loadImage(this.props.value)
  }

  componentWillReceiveProps(newProps: ImageWellProps) {
    if (newProps.value !== this.props.value) {
      this.loadImage(newProps.value)
    }
  }

  async loadImage(image: string | File | undefined) {
    if (!image) {
      this.setState({ imageData: undefined })
    } else if (typeof image === 'string') {
      this.setState({ imageData: image })
    } else {
      this.setState({ imageData: await toDataUri(image) })
    }
  }

  handleDrop = (files: ImageFile[]) => {
    if (files[0]) {
      this.props.onChange(files[0])
    }
  }

  render() {
    const { classes, children, placeholder = 'Upload an image' } = this.props

    return (
      <Dropzone className={classes.dropzone} onDrop={this.handleDrop}>
        <div
          className={classnames(classes.wrapper, {
            [classes.hasImage]: !!this.state.imageData,
          })}
        >
          <img className={classes.image} src={this.state.imageData} />

          <Placeholder />

          <Toolbar className={classes.toolbar}>
            {children}
            <Button mini variant="fab">
              <AddAPhoto />
            </Button>
          </Toolbar>
        </div>
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

export const ImageWell = withStyles(styles)(_ImageWell)
