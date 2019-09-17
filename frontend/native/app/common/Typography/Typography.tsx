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
import { moderateScale } from 'react-native-size-matters'
import * as theme from '../../../theme'
import { Linking } from 'expo'

const TypographyVariants = StyleSheet.create({
  display: {
    fontFamily: 'patua-one',
    fontSize: moderateScale(24),
  },
  screenHeader: {
    fontFamily: 'patua-one',
    fontSize: moderateScale(17),
  },
  wizardTitle: {
    fontFamily: 'patua-one',
    fontSize: moderateScale(20),
  },
  cardTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: moderateScale(15),
  },
  cardTitleVariant: {
    fontFamily: 'open-sans-semibold',
    fontSize: moderateScale(15),
  },
  tiny: {
    fontFamily: 'open-sans-light',
    fontSize: moderateScale(11),
  },
  subtitle: {
    fontFamily: 'patua-one',
  },
  action: {
    fontSize: moderateScale(15),
    fontFamily: 'oswald-bold',
  },
  body: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
    fontFamily: 'open-sans-light',
  },
  primary: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
    fontFamily: 'open-sans-light',
  },
  caption: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
    fontFamily: 'open-sans-semibold',
  },
  captionSmall: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(16),
    fontFamily: 'open-sans-semibold',
  },
  small: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19),
    fontFamily: 'open-sans-light',
  },
})

const TypographyStyles = StyleSheet.create({
  paragraph: {
    marginBottom: theme.spacing.level(1),
  },
  markdown: {
    marginVertical: moderateScale(-10),
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
  variant?: TypographyVariant
  darkBg?: boolean
  accent?: boolean
  center?: boolean
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
}

export type TypographyVariant = keyof typeof TypographyVariants

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
  variant?: TypographyVariant
}

export function Paragraphs({
  textStyle,
  style,
  children,
  variant = 'body',
}: ParagraphsProps) {
  return (
    <View style={style}>
      {React.Children.map(children, (child, i) => (
        <Typography
          variant={variant}
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
    fontSize: moderateScale(15),
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
