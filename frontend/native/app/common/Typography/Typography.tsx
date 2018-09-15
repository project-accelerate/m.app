import React from 'react'
import {
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TextProps,
  TouchableOpacity,
} from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import { theme } from '../../../theme'
import { Linking } from 'expo'

const TypographyVariants = StyleSheet.create({
  display: {
    fontFamily: 'patua-one',
    fontSize: 24,
  },
  screenHeader: {
    fontFamily: 'patua-one',
    fontSize: 17,
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
  tiny: {
    fontFamily: 'open-sans-light',
    fontSize: 11,
  },
  subtitle: {
    fontFamily: 'patua-one',
  },
  action: {
    fontSize: 15,
    fontFamily: 'oswald-bold',
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'open-sans-light',
  },
  primary: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'open-sans-light',
  },
  caption: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'open-sans-semibold',
  },
  captionSmall: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: 'open-sans-semibold',
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
  link: {
    textDecorationLine: 'underline',
  },
})

export interface TypographyProps extends TextProps {
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
  ...props
}: TypographyProps) {
  return (
    <Text
      {...props}
      style={[
        style,
        variant && TypographyVariants[variant],
        accent && TypographyStyles.accent,
        darkBg && TypographyStyles.darkBg,
        center && TypographyStyles.center,
      ]}
    >
      {children}
    </Text>
  )
}

export function Link({
  href,
  style,
  ...typographyProps
}: TypographyProps & { href: string }) {
  const handlePress = () => {
    Linking.openURL(href)
  }

  return (
    <Typography
      onPress={handlePress}
      style={[style, TypographyStyles.link]}
      {...typographyProps}
    />
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
  style?: StyleProp<ViewStyle>
}

const markdownStyles = {
  paragraph: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'open-sans-light',
  },
}

export function Markdown({ value, style }: MarkdownProps) {
  return (
    <View style={style}>
      <MarkdownView styles={markdownStyles}>{value}</MarkdownView>
    </View>
  )
}

const getKey = (x: any) => x.key
