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
import formInput from 'react-native-formik'
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

const FieldStyle = StyleSheet.create({
  field: {
    width: '100%',
    fontSize: 18,
    padding: theme.spacing.level(1),
    marginBottom: theme.spacing.level(2),
    borderColor: theme.pallete.control,
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

export const FormField = formInput(Field)

const LoadingOverlayStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export function LoadingOverlay() {
  return (
    <View style={LoadingOverlayStyle.container}>
      <ActivityIndicator size="large" color={theme.pallete.accent} />
    </View>
  )
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
  children: React.ReactElement<{}>[]
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

interface MenuBarProps
  extends Partial<NavigationInjectedProps>,
    React.Props<{}> {
  floatMenu?: boolean
  noBackButton?: boolean
}

const ScreenStyles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  floating: {
    position: 'absolute',
    zIndex: theme.zIndex.menu,
  },
  notFloating: {
    backgroundColor: theme.pallete.accent,
  },
  menu: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    padding: 14,
  },
  buttonIcon: {
    textShadowColor: theme.pallete.black,
    textShadowRadius: 10,
  },
  content: {
    flexGrow: 1,
    position: 'relative',
  },
})

export const Screen = withNavigation(function MenuBar({
  navigation,
  children,
  floatMenu,
  noBackButton,
}: MenuBarProps): React.ReactElement<{}> {
  const openDrawer = () => navigation!.openDrawer()
  const goBack = () => {
    if (isTopLevel) {
      navigation!.navigate({
        routeName: HomeScreen.name,
      })
    } else {
      navigation!.goBack()
    }
  }
  const state = navigation!.state as NavigationRoute
  const route = Routes.get().resolve(state.routeName)
  const getOptions = route && route.navigationOptions
  const navigationOptions =
    typeof getOptions === 'function'
      ? getOptions({ navigation } as any)
      : getOptions
  const title = navigationOptions && navigationOptions.headerTitle
  const isTopLevel = Routes.get().isTopLevel(state.routeName)
  const floatStyle = floatMenu
    ? [{ top: getStatusBarHeight() }, ScreenStyles.floating]
    : [{ paddingTop: getStatusBarHeight() }, ScreenStyles.notFloating]

  return (
    <View style={ScreenStyles.screen}>
      <NotificationListener />
      <SafeAreaView style={[ScreenStyles.menu, floatStyle]}>
        <TouchableOpacity style={ScreenStyles.button} onPress={goBack}>
          {!noBackButton && (
            <FontAwesome
              style={ScreenStyles.buttonIcon}
              name="chevron-left"
              color="white"
              size={26}
            />
          )}
        </TouchableOpacity>
        <View>
          {(title && (
            <Typography variant="cardTitle" darkBg>
              {title}
            </Typography>
          )) ||
            undefined}
        </View>
        <TouchableOpacity style={ScreenStyles.button} onPress={openDrawer}>
          <FontAwesome
            style={ScreenStyles.buttonIcon}
            name="bars"
            color="white"
            size={26}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {children}
    </View>
  )
})

interface ToolbarProps {
  children?: React.ReactNode
}

const ToolbarStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.pallete.contrast,
    paddingHorizontal: theme.spacing.level(1),
  },
  radio: {
    backgroundColor: theme.pallete.white,
    paddingHorizontal: theme.spacing.level(2),
    paddingVertical: theme.spacing.level(1),
    borderColor: theme.pallete.black,
    borderWidth: 2,
    flexGrow: 1,
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
      <Typography variant="caption">{props.children}</Typography>
    </TouchableOpacity>
  )
}

export function Touchable(props: TouchableWithoutFeedbackProps) {
  if (Constants.platform.android) {
    return <TouchableNativeFeedback {...props} />
  }

  return <TouchableWithoutFeedback {...props} />
}
