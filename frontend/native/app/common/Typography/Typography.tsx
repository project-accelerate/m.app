import React from 'react'
import {
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import { theme } from '../../../theme'

const TypographyVariants = StyleSheet.create({
  display: {
    fontSize: 20,
    fontWeight: '300',
  },
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
  accent2: {
    color: theme.pallete.accent,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 13,
    lineHeight: 21,
  },
})

const TypographyStyles = StyleSheet.create({
  paragraph: {
    marginBottom: theme.spacing.level(1),
  },
  markdown: {
    marginVertical: -10,
  },
  darkBg: {
    color: theme.pallete.white,
  },
})

interface TypographyProps {
  variant?: keyof typeof TypographyVariants
  darkBg?: boolean
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
}

export function Typography({
  variant,
  children,
  style,
  darkBg,
}: TypographyProps) {
  return (
    <Text
      style={[
        style,
        variant && TypographyVariants[variant],
        darkBg && TypographyStyles.darkBg,
      ]}
    >
      {children}
    </Text>
  )
}

export function Br(): any {
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
        <Typography
          variant="body"
          style={[textStyle, TypographyStyles.paragraph]}
          key={getKey(child) || i}
        >
          {child}
        </Typography>
      ))}
    </View>
  )
}

interface MarkdownProps {
  value: string
  style: StyleProp<ViewStyle>
}

const markdownStyles = {
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
  },
}

export function Markdown({ value, style }: MarkdownProps) {
  return (
    <View style={style}>
      <MarkdownView style={TypographyStyles.markdown} styles={markdownStyles}>
        {value}
      </MarkdownView>
    </View>
  )
}

const getKey = (x: any) => x.key
