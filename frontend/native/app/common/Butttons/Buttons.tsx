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

const ButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: theme.pallete.accent,
    padding: theme.spacing.level(3),
    borderColor: theme.pallete.white,
    borderWidth: 1,
    opacity: 0.9,
  },
  text: {
    color: theme.pallete.white,
    textAlign: 'center',
  },
  large: {
    fontSize: 24,
    fontWeight: '700',
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

interface ButtonGridProps extends ViewProps {
  children?: React.ReactElement<TouchableHighlightProps>[]
}

export function ButtonGrid({ children, ...props }: ButtonGridProps) {
  return (
    <View style={ButtonStyle.grid}>
      {children &&
        children.map((child, i) =>
          React.cloneElement(child, {
            key: child.key || `btn-grid=${i}`,
            style: [ButtonStyle.gridItem, child.props.style],
          }),
        )}
    </View>
  )
}

interface ButtonProps extends TouchableHighlightProps {
  children?: React.ReactNode
}

export function Button({ children, style, ...props }: ButtonProps) {
  return (
    <TouchableHighlight style={[ButtonStyle.button, style]} {...props}>
      <Text style={[ButtonStyle.text, ButtonStyle.large]}>{children}</Text>
    </TouchableHighlight>
  )
}
