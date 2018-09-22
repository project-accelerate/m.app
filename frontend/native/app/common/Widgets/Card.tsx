import * as React from 'react'
import {
  StyleSheet,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import { theme } from '../../../theme'
import {
  Typography,
  TypographyProps,
  Paragraphs,
  Markdown,
} from '../Typography/Typography'
import { TouchableProps } from 'react-native-svg'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.pallete.box,
    padding: theme.spacing.level(1),
  },
  groupHeader: {
    marginTop: theme.spacing.level(3),
    marginBottom: theme.spacing.level(1),
  },
  card: {
    padding: theme.spacing.level(2),
    paddingTop: theme.spacing.level(1),
    borderRadius: 4,
    backgroundColor: theme.pallete.white,
    borderColor: theme.pallete.borderDark,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: { width: 2, height: 5 },
    marginBottom: theme.spacing.level(2),
  },
  header: {
    marginTop: theme.spacing.level(2),
  },
  subheader: {
    marginTop: theme.spacing.level(2),
  },
  content: {
    marginTop: theme.spacing.level(1),
  },
})

interface CardElementProps {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export function CardContainer({ style, children }: CardElementProps) {
  return <View style={[styles.container, style]}>{children}</View>
}

export function Card({
  onPress,
  style,
  children,
}: TouchableProps & ViewProps & React.Props<{}>) {
  const view = <View style={[style, styles.card]}>{children}</View>
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{view}</TouchableOpacity>
  ) : (
    view
  )
}

export function CardGroupHeader({ style, ...props }: TypographyProps) {
  return (
    <Typography
      variant="display"
      accent
      style={[style, styles.groupHeader]}
      {...props}
    />
  )
}

export function CardHeader({ style, ...props }: TypographyProps) {
  return (
    <Typography variant="cardTitle" style={[style, styles.header]} {...props} />
  )
}

export function CardSubheader({ style, ...props }: TypographyProps) {
  return (
    <Typography
      variant="cardTitleVariant"
      accent
      style={[style, styles.subheader]}
      {...props}
    />
  )
}

export function CardContent({ style, ...props }: TypographyProps) {
  return (
    <Typography variant="body" style={[style, styles.content]}>
      {props.children}
    </Typography>
  )
}

export function CardMarkdownContent({ style, ...props }: TypographyProps) {
  return (
    <Markdown style={[style, styles.content]} value={props.children as any} />
  )
}
