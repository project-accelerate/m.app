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
    fontFamily: 'patua-one',
    fontSize: 24,
  },
  wizardTitle: {
    fontFamily: 'patua-one',
    fontSize: 20,
  },
  cardTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
  },
  cardTitleVariant: {
    fontFamily: 'open-sans-light',
    fontSize: 15,
  },
  subtitle: {
    fontFamily: 'patua-one',
  },
  body: {
    fontSize: 13,
    fontFamily: 'open-sans-light',
  },
  action: {
    fontSize: 15,
    fontFamily: 'oswald-bold',
  },
  caption: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'open-sans-light',
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
  accent: {
    color: theme.pallete.accent,
  },
  center: {
    textAlign: 'center',
  },
})

interface TypographyProps {
  variant?: keyof typeof TypographyVariants
  darkBg?: boolean
  accent?: boolean
  center?: boolean
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
}

export function Typography({
  variant,
  children,
  style,
  darkBg,
  accent,
  center,
}: TypographyProps) {
  return (
    <Text
      style={[
        style,
        variant && TypographyVariants[variant],
        darkBg && TypographyStyles.darkBg,
        accent && TypographyStyles.accent,
        center && TypographyStyles.center,
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
