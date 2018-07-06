import React from 'react'
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native'
import { theme } from '../../../theme'

const TypographyVariants = StyleSheet.create({
  cardTitle: {
    fontWeight: '500',
    fontSize: 18,
  },
  accent: {
    color: theme.pallete.accent,
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
