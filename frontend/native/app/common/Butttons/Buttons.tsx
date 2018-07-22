import React from 'react'
import {
  StyleSheet,
  ViewProps,
  TouchableHighlightProps,
  View,
  TouchableHighlight,
  Text,
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
  size?: 'large' | 'small'
}

export function Button({
  children,
  style,
  size = 'large',
  ...props
}: ButtonProps) {
  return (
    <TouchableHighlight
      style={[buttonStyle.button, buttonStyle[size], style]}
      {...props}
    >
      <Text style={[buttonStyle.text, textStyle[size]]}>{children}</Text>
    </TouchableHighlight>
  )
}
