import * as React from 'react'
import { withNavigation, NavigationInjectedProps, NavigationRoute, SafeAreaView } from "react-navigation";
import { HomeScreen } from '../../twt/Home/HomeScreen';
import { getStatusBarHeight } from '../platform';
import { Routes } from '../../../routes';
import { theme } from '../../../theme';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Typography } from '../Typography/Typography';

interface HeaderBarProps extends Partial<NavigationInjectedProps> {
  floatMenu?: boolean
  noBackButton?: boolean
}

const styles = StyleSheet.create({
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
})

export const HeaderBar = withNavigation(function HeaderBar({
  navigation,
  floatMenu,
  noBackButton,
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
  const floatStyle = floatMenu
    ? [{ top: getStatusBarHeight() }, styles.floating]
    : [{ paddingTop: getStatusBarHeight() }, styles.notFloating]

  return (
    <SafeAreaView style={[styles.menu, floatStyle]}>
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
          <Typography variant="cardTitle" darkBg>
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
    </SafeAreaView>
  )
})