import React from 'react'
import {
  StyleSheet,
  ViewProps,
  TouchableHighlightProps,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from 'react-native'
import { theme } from '../../../theme'
import { Typography } from '../Typography/Typography'

const buttonStyle = StyleSheet.create({
  header: {},
  button: {
    backgroundColor: theme.pallete.accent,
    borderColor: theme.pallete.borderLight,
    borderBottomColor: theme.pallete.borderDark,
    borderWidth: 0.5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    paddingVertical: theme.spacing.level(1),
    paddingHorizontal: theme.spacing.level(2),
  },
  small: {
    height: 35,
    paddingHorizontal: theme.spacing.level(2),
  },
  inline: {
    padding: theme.spacing.level(2),
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
  variant?: 'large' | 'small' | 'inline'
}

export function Button({
  children,
  style,
  variant = 'large',
  disabled,
  ...props
}: ButtonProps) {
  const ButtonType =
    variant === 'inline' ? TouchableOpacity : TouchableHighlight

  return (
    <ButtonType
      style={[
        buttonStyle.button,
        buttonStyle[variant],
        disabled && buttonStyle.disabled,
        style,
      ]}
      {...props}
    >
      <Typography variant="action" darkBg center>
        {children}
      </Typography>
    </ButtonType>
  )
}
