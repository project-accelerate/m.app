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
import { FontAwesome } from '@expo/vector-icons'
import { ScaledSheet } from 'react-native-size-matters'

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
  },
  small: {
    paddingVertical: theme.spacing.level(0.5),
    paddingHorizontal: theme.spacing.level(2),
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
}

export function Button({
  children,
  style,
  variant = 'standard',
  disabled,
  icon,
  darkBg,
  ...props
}: ButtonProps) {
  const inline = variant === 'inline'
  const ButtonType = inline ? TouchableOpacity : TouchableHighlight

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
      <View style={buttonStyle.content}>
        {icon ? (
          <FontAwesome
            name={icon}
            style={buttonStyle.icon}
            size={variant === 'standard' ? 24 : 18}
            color={
              inline && !darkBg ? theme.pallete.accent : theme.pallete.white
            }
          />
        ) : (
          undefined
        )}
        <Typography
          variant="action"
          darkBg={!inline || darkBg}
          accent={inline}
          center
        >
          {children}
        </Typography>
      </View>
    </ButtonType>
  )
}
