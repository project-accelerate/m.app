import React from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  Typography,
  IconButton,
  CardContent,
} from '@material-ui/core'
import Button, { ButtonProps } from '@material-ui/core/Button'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'
import { Style } from '@material-ui/core/styles/createTypography'
import { ExpandMore } from '@material-ui/icons'
import CardMedia, { CardMediaProps } from '@material-ui/core/CardMedia'

const styles = withStyles(({ spacing, transitions, palette }) =>
  createStyles({
    fab: {
      position: 'fixed',
      padding: spacing.unit,
      right: 0,
      bottom: 0,
    },
    discloseBtn: {
      transition: transitions.create('transform', {
        duration: transitions.duration.shortest,
      }),

      transform: 'rotate(0deg)',
    },
    disclosed: {
      transform: 'rotate(180deg)',
    },
    mediaWrapper: {
      position: 'relative',
      maxHeight: 300,
    },
    imageOverlay: {
      position: 'absolute',
      left: 0,
      top: 0,
      background: 'rgba(0,0,0,0.5)',
      width: '100%',
      color: palette.common.white,
      padding: spacing.unit * 2,
    },
    media: {
      maxHeight: 300,
      objectFit: 'cover',
      objectPosition: 'top left',
    },
  }),
)

export const FloatingActionButton = styles<ButtonProps>(
  function FloatingActionButton({ className, classes, ...props }) {
    return (
      <div className={classes.fab}>
        <Button {...props} variant="fab" className={className} />
      </div>
    )
  },
)

interface MarkdownViewProps {
  value?: string
}

export const MarkdownView = styles<MarkdownViewProps>(function MarkdownView({
  value = '',
  classes,
}) {
  function markdownStyle(style: Style, el?: string, className?: string) {
    return (props: React.Props<{}>) => (
      <Typography className={className} component={el} variant={style}>
        {props.children}
      </Typography>
    )
  }
  return (
    <Typography variant="body1">
      <ReactMarkdown source={value} renderers={{}} />
    </Typography>
  )
})

interface ToggleProps {
  startActive?: boolean
  children: (props: { active: boolean; toggle: () => void }) => React.ReactNode
}

export class Toggle extends React.Component<ToggleProps> {
  state = { active: this.props.startActive || false }

  render() {
    return this.props.children({
      active: this.state.active,
      toggle: () => {
        this.setState({ active: !this.state.active })
      },
    })
  }
}

interface DiscloseButtonProps {
  disclosed?: boolean
  onClick: React.MouseEventHandler<{}>
}

export const DiscloseButton = styles<DiscloseButtonProps>(
  function DiscloseButton({ disclosed, onClick, classes }) {
    return (
      <IconButton
        className={classnames(classes.discloseBtn, {
          [classes.disclosed]: disclosed,
        })}
        onClick={onClick}
      >
        <ExpandMore />
      </IconButton>
    )
  },
)

interface CardImageProps {
  src?: string | null
  children?: React.ReactNode
}

export const CardImage = styles<CardImageProps>(function CardImage({
  classes,
  src,
  children,
}) {
  if (!src) {
    return <CardContent>{children}</CardContent>
  }

  return (
    <div className={classes.mediaWrapper}>
      <CardMedia className={classes.media} component="img" src={src} />

      <div className={classes.imageOverlay}>{children}</div>
    </div>
  )
})
