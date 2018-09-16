import React from 'react'
import {
  StyleSheet,
  ViewProps,
  TouchableHighlightProps,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native'
import { theme } from '../../../theme'
import { Typography } from '../Typography/Typography'
import { FontAwesome } from '@expo/vector-icons'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'

const buttonStyle = ScaledSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.pallete.accent,
    borderColor: theme.pallete.borderLight,
    borderBottomColor: theme.pallete.borderDark,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  standard: {
    paddingVertical: theme.spacing.level(1),
    paddingHorizontal: theme.spacing.level(2),
    minWidth: moderateScale(60),
  },
  inline: {
    padding: 0,
    backgroundColor: theme.pallete.transparent,
    borderWidth: 0,
    opacity: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    paddingVertical: theme.spacing.level(2),
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    position: 'relative',
    top: 1,
    marginRight: theme.spacing.level(1),
  },
})

interface ButtonGridProps extends ViewProps {
  children?: React.ReactElement<TouchableHighlightProps>[]
}

export function ButtonGrid({ children, ...props }: ButtonGridProps) {
  return (
    <View style={buttonStyle.grid}>
      {children &&
        children.map((child, i) =>
          React.cloneElement(child, {
            key: child.key || `btn-grid=${i}`,
            style: [buttonStyle.gridItem, child.props.style],
          }),
        )}
    </View>
  )
}

interface ButtonProps extends TouchableHighlightProps {
  children?: React.ReactNode
  variant?: 'standard' | 'inline'
  darkBg?: boolean
  icon?: string
  pending?: boolean
}

export function Button({
  children,
  style,
  variant = 'standard',
  disabled,
  icon,
  darkBg,
  pending,
  ...props
}: ButtonProps) {
  const inline = variant === 'inline'

  return (
    <TouchableOpacity
      style={[
        buttonStyle.button,
        buttonStyle[variant],
        disabled && buttonStyle.disabled,
        style,
      ]}
      {...props}
    >
      <View style={buttonStyle.content}>
        {!pending && icon ? (
          <FontAwesome
            name={icon}
            style={buttonStyle.icon}
            size={moderateScale(24)}
            color={
              inline && !darkBg ? theme.pallete.accent : theme.pallete.white
            }
          />
        ) : (
          undefined
        )}
        {!pending && (
          <Typography
            variant="action"
            darkBg={!inline || darkBg}
            accent={inline}
            center
          >
            {children}
          </Typography>
        )}
        {pending && (
          <ActivityIndicator
            size="small"
            color={
              (inline && !darkBg && theme.pallete.accent) || theme.pallete.white
            }
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

interface ActionButtonProps extends ButtonProps {
  action: () => Promise<any>
}

interface ActionButtonState {
  pending: boolean
}
export class ActionButton extends React.Component<
  ActionButtonProps,
  ActionButtonState
> {
  state = { pending: false }
  unmounted = false

  handlePressed = async (event: GestureResponderEvent) => {
    if (this.state.pending) {
      return
    }

    if (this.props.onPress) {
      this.props.onPress(event)
    }

    if (!event.defaultPrevented) {
      this.setState({ pending: true })

      try {
        await this.props.action()
      } finally {
        if (!this.unmounted) {
          this.setState({ pending: false })
        }
      }
    }
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  render() {
    const { pending, action, onPress, ...props } = this.props

    return (
      <Button
        {...props}
        pending={this.state.pending || pending}
        onPress={this.handlePressed}
      />
    )
  }
}
