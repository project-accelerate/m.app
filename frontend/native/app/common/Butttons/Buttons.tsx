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

const buttonStyle = StyleSheet.create({
  button: {
    backgroundColor: theme.pallete.accent,
    borderColor: theme.pallete.white,
    borderWidth: 1,
    opacity: 0.9,
  },
  text: {
    color: theme.pallete.white,
    textAlign: 'center',
  },
  large: {
    padding: theme.spacing.level(3),
  },
  small: {
    padding: theme.spacing.level(2),
  },
  inline: {
    padding: theme.spacing.level(2),
    backgroundColor: theme.pallete.transparent,
    borderWidth: 0,
    opacity: 1
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    paddingVertical: theme.spacing.level(2),
  },
})

const textStyle = StyleSheet.create({
  large: {
    fontSize: 24,
    fontWeight: '700',
  },
  small: {
    fontSize: 20,
    fontWeight: '700',
  },
  inline: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.pallete.accent
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
  ...props
}: ButtonProps) {
  const ButtonType = variant === 'inline' ? TouchableOpacity : TouchableHighlight
  
  return (
    <ButtonType
      style={[buttonStyle.button, buttonStyle[variant], style]}
      {...props}
    >
      <Text style={[buttonStyle.text, textStyle[variant]]}>{children}</Text>
    </ButtonType>
  )
}
