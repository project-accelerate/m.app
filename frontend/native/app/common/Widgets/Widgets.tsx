import React from 'react'
import {
  ActivityIndicator,
  View,
  ImageStyle,
  StyleProp,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
  TextInputProps,
  TextInput,
  TouchableWithoutFeedbackProps,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
import formInput, { makeInputGreatAgainProps } from 'react-native-formik'
import { theme } from '../../../theme'
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationRoute,
} from 'react-navigation'
import { Typography } from '../Typography/Typography'
import { Constants } from 'expo'
import { CachedImage } from './CachedImage'
import { moderateScale } from 'react-native-size-matters'
import Toast from 'react-native-root-toast'
import { HEADER_HEIGHT } from '../Screen/HeaderBar'

const FieldStyle = StyleSheet.create({
  field: {
    width: '100%',
    fontSize: moderateScale(15),
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
    padding: theme.spacing.level(4),
  },
  message: {
    margin: theme.spacing.level(2),
  },
})

export function LoadingOverlay(props: {
  message?: string
  darkBg?: boolean
  children?: React.ReactNode
}) {
  return (
    <View style={LoadingOverlayStyle.container}>
      <LoadingIndicator darkBg={props.darkBg} />
      <Typography style={LoadingOverlayStyle.message} variant="body">
        {props.message || ' '}
      </Typography>
      {props.children}
    </View>
  )
}

export function LoadingIndicator(props: { darkBg?: boolean }) {
  return (
    <ActivityIndicator
      size="large"
      color={props.darkBg ? theme.pallete.white : theme.pallete.accent}
    />
  )
}

const ProfileImageSize = StyleSheet.create({
  small: {
    width: moderateScale(96),
    height: moderateScale(96),
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

const ProfileImageStyle = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
})

interface ProfileImageProps {
  style?: StyleProp<ImageStyle>
  size?: keyof typeof ProfileImageSize
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
    <View style={[style, ProfileImageStyle.container, ProfileImageSize[size]]}>
      <CachedImage
        style={ProfileImageStyle.content}
        source={
          typeof image === 'number'
            ? image
            : { cache: 'force-cache', uri: image.sourceUrl }
        }
      />
      {children && <View style={ProfileImageStyle.content}>{children}</View>}
    </View>
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
  flex?: boolean
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
  flex: {
    flex: 1,
  },
})

export function Rows({ style, flex, center, children }: GridProps) {
  return (
    <View
      style={[
        style,
        center && gridStyles.center,
        gridStyles.rows,
        flex && gridStyles.flex,
      ]}
    >
      {children}
    </View>
  )
}

export function Columns({ style, center, children, flex }: GridProps) {
  return (
    <View
      style={[
        style,
        center && gridStyles.center,
        gridStyles.columns,
        flex && gridStyles.flex,
      ]}
    >
      {children}
    </View>
  )
}

export function notifyUser(message: string) {
  Toast.show(message, {
    textColor: theme.pallete.white,
    backgroundColor: theme.pallete.accent,
    position: HEADER_HEIGHT + theme.spacing.level(2),
  })
}
