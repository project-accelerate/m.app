import * as React from 'react'
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationRoute,
  SafeAreaView,
} from 'react-navigation'
import { HomeScreen } from '../../twt/Home/HomeScreen'
import { getStatusBarHeight } from '../platform'
import { Routes } from '../../../routes'
import { theme } from '../../../theme'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Typography } from '../Typography/Typography'
import { moderateScale } from 'react-native-size-matters'

interface HeaderBarProps extends Partial<NavigationInjectedProps> {
  floating?: boolean
  noBackButton?: boolean
}

export const HEADER_CONTENT_HEIGHT = moderateScale(48, 0.25)
export const HEADER_HEIGHT = HEADER_CONTENT_HEIGHT + getStatusBarHeight()
const PADDING = moderateScale(10, 0.25)
const ICONSIZE = moderateScale(26, 0.25)

const styles = StyleSheet.create({
  menu: {
    paddingTop: getStatusBarHeight(),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    maxWidth: Dimensions.get('screen').width,
  },
  header: {
    maxWidth: Dimensions.get('screen').width - 2 * (2 * PADDING + ICONSIZE),
  },
  button: {
    padding: PADDING,
  },
  notFloating: {
    backgroundColor: theme.pallete.accent,
  },
  buttonIcon: {
    textShadowColor: theme.pallete.black,
    textShadowRadius: moderateScale(10),
  },
})

export const HeaderBar = withNavigation(function HeaderBar({
  navigation,
  noBackButton,
  floating,
}: HeaderBarProps) {
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

  return (
    <View style={[styles.menu, !floating && styles.notFloating]}>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        {!noBackButton && (
          <FontAwesome
            style={styles.buttonIcon}
            name="chevron-left"
            color="white"
            size={ICONSIZE}
          />
        )}
      </TouchableOpacity>
      <View>
        {(title && (
          <Typography
            center
            style={styles.header}
            variant="screenHeader"
            darkBg
          >
            {title}
          </Typography>
        )) ||
          undefined}
      </View>
      <TouchableOpacity style={styles.button} onPress={openDrawer}>
        <FontAwesome
          style={styles.buttonIcon}
          name="bars"
          color="white"
          size={ICONSIZE}
        />
      </TouchableOpacity>
    </View>
  )
})
