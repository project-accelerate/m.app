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
import { TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Typography } from '../Typography/Typography'

interface HeaderBarProps extends Partial<NavigationInjectedProps> {
  floating?: boolean
  noBackButton?: boolean
}

export const HEADER_CONTENT_HEIGHT = 48
export const HEADER_HEIGHT = HEADER_CONTENT_HEIGHT + getStatusBarHeight()

const styles = StyleSheet.create({
  menu: {
    paddingTop: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
  },
  button: {
    padding: 10,
  },
  buttonIcon: {
    textShadowColor: theme.pallete.black,
    textShadowRadius: 10,
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
    <View style={styles.menu}>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        {!noBackButton && (
          <FontAwesome
            style={styles.buttonIcon}
            name="chevron-left"
            color="white"
            size={26}
          />
        )}
      </TouchableOpacity>
      <View>
        {(title && (
          <Typography variant="screenHeader" darkBg>
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
          size={26}
        />
      </TouchableOpacity>
    </View>
  )
})
