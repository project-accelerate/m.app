import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ImageStyle,
  StyleProp,
  ImageBackground,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInputProps,
  TextInput,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedbackProps,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native'
import formInput, { makeInputGreatAgainProps } from 'react-native-formik'
import { FontAwesome } from '@expo/vector-icons'
import { theme } from '../../../theme'
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationRoute,
} from 'react-navigation'
import { Typography } from '../Typography/Typography'
import { Routes } from '../../../routes'
import { HomeScreen } from '../../twt/Home/HomeScreen'
import { getStatusBarHeight } from '../platform'
import { Constants } from 'expo'
import { NotificationListener } from '../Notification/NotificationListener'
import { ErrorGuard } from '../ErrorView/ErrorGuard'
import { HeaderBar } from '../Screen/HeaderBar'

const FieldStyle = StyleSheet.create({
  field: {
    width: '100%',
    fontSize: 15,
    padding: theme.spacing.level(1),
    borderColor: theme.pallete.borderLight,
    backgroundColor: theme.pallete.control,
    borderWidth: 1,
  },
})

export function Field({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      {...props}
      underlineColorAndroid="transparent"
      style={[style, FieldStyle.field]}
    />
  )
}

export const FormField: React.ComponentType<
  makeInputGreatAgainProps & TextInputProps
> = formInput(Field as any)

const LoadingOverlayStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    margin: theme.spacing.level(2),
  },
})

export function LoadingOverlay(props: {
  message?: string
  children?: React.ReactNode
}) {
  return (
    <View style={LoadingOverlayStyle.container}>
      <LoadingIndicator />
      <Typography style={LoadingOverlayStyle.message} variant="body">
        {props.message || ' '}
      </Typography>
      {props.children}
    </View>
  )
}

export function LoadingIndicator() {
  return <ActivityIndicator size="large" color={theme.pallete.accent} />
}

const ProfileImageStyle = StyleSheet.create({
  small: {
    width: 96,
    height: 96,
  },
  fullWidth: {
    width: '100%',
  },
  halfSquare: {
    width: Dimensions.get('screen').width * 0.5,
    height: Dimensions.get('screen').width * 0.5,
  },
  halfScreen: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.5,
  },
  fullScreen: {
    width: '100%',
    height: Dimensions.get('screen').height,
  },
})

interface ProfileImageProps {
  style?: StyleProp<ImageStyle>
  size?: keyof typeof ProfileImageStyle
  image: { sourceUrl: string } | number | null
  children?: React.ReactNode
}

export function ProfileImage({
  children,
  style,
  image,
  size = 'small',
}: ProfileImageProps) {
  if (!image) {
    return null
  }

  return (
    <ImageBackground
      style={[style, ProfileImageStyle[size]]}
      source={
        typeof image === 'number'
          ? image
          : { cache: 'force-cache', uri: image.sourceUrl }
      }
    >
      {children}
    </ImageBackground>
  )
}

const BannerStyles = StyleSheet.create({
  banner: {
    backgroundColor: theme.pallete.imageOverlay,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing.level(1),
  },
})

export function Banner({ children }: React.Props<{}>) {
  return <View style={BannerStyles.banner}>{children}</View>
}

const GridStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    padding: theme.spacing.level(1),
  },
})

export function Grid({
  children,
  style,
}: {
  children: JSX.Element[]
  style?: StyleProp<ViewStyle>
}) {
  return (
    <View style={[GridStyles.grid, style]}>
      {children.map((child, i) => (
        <View key={child.key || i} style={GridStyles.item}>
          {child}
        </View>
      ))}
    </View>
  )
}

interface ToolbarProps {
  children?: React.ReactNode
}

const ToolbarStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.level(1),
  },
  radio: {
    paddingHorizontal: theme.spacing.level(2),
    paddingVertical: theme.spacing.level(1),
    alignItems: 'center',
  },
  radioActive: {
    backgroundColor: theme.pallete.accent,
  },
})

export function Toolbar({ children = [] }: ToolbarProps) {
  return <View style={ToolbarStyles.wrapper}>{children}</View>
}

interface ToolbarRadioProps {
  id?: string
  active?: boolean
  onPress: (id?: string) => void
  children?: React.ReactNode
}

export function ToolbarRadio(props: ToolbarRadioProps) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.id)}
      style={[ToolbarStyles.radio, props.active && ToolbarStyles.radioActive]}
    >
      <Typography darkBg={props.active} variant="caption">
        {props.children}
      </Typography>
    </TouchableOpacity>
  )
}

export function Touchable(props: TouchableWithoutFeedbackProps) {
  if (Constants.platform.android) {
    return <TouchableNativeFeedback {...props} />
  }

  return <TouchableWithoutFeedback {...props} />
}

export function Spacing(props: { level?: number }) {
  return <View style={{ height: theme.spacing.level(props.level || 1) }} />
}

interface GridProps {
  style?: StyleProp<ViewStyle>
  center?: boolean
  children?: React.ReactNode
}

const gridStyles = StyleSheet.create({
  rows: {
    flexDirection: 'column',
  },
  columns: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
})

export function Rows({ style, center, children }: GridProps) {
  return (
    <View style={[style, center && gridStyles.center, gridStyles.rows]}>
      {children}
    </View>
  )
}

export function Columns({ style, center, children }: GridProps) {
  return (
    <View style={[style, center && gridStyles.center, gridStyles.columns]}>
      {children}
    </View>
  )
}
