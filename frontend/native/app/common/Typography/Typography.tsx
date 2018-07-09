import React from 'react'
import {
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { theme } from '../../../theme'

const TypographyVariants = StyleSheet.create({
  cardTitle: {
    fontWeight: '500',
    fontSize: 18,
  },
  subtitle: {
    fontWeight: '500',
  },
  accent: {
    color: theme.pallete.accent,
  },
})

const TypographyStyles = StyleSheet.create({
  paragraph: {
    marginBottom: theme.spacing.level(1),
  },
})

interface TypographyProps {
  variant?: keyof typeof TypographyVariants
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
}

export function Typography({ variant, children, style }: TypographyProps) {
  return (
    <Text style={[style, variant && TypographyVariants[variant]]}>
      {children}
    </Text>
  )
}

export function Br(): React.ReactNode {
  return '\n'
}

interface ParagraphsProps {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
}

export function Paragraphs({ textStyle, style, children }: ParagraphsProps) {
  return (
    <View style={style}>
      {React.Children.map(children, (child, i) => (
        <Text
          style={[textStyle, TypographyStyles.paragraph]}
          key={getKey(child) || i}
        >
          {child}
        </Text>
      ))}
    </View>
  )
}

const getKey = (x: any) => x.key
