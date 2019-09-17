import React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { NavigationInjectedProps, NavigationActions } from 'react-navigation'
import { Routes } from '../../../routes'
import * as theme from '../../../theme'
import { Typography } from '../Typography/Typography'
import { HomeScreen } from '../../twt/Home/HomeScreen'
import { getStatusBarHeight } from '../platform'
import { createStateConnector } from '../../../state'
import * as registration from '../../twt/Registration/registrationState'
import Logo from '../../../assets/Mlogo'
import { Background } from '../Layouts/Layouts'
import { moderateScale } from 'react-native-size-matters'

const style = StyleSheet.create({
  root: {
    backgroundColor: theme.pallete.accent,
    height: '100%',
  },
  header: {
    marginTop: getStatusBarHeight(),
  },
  items: {
    flex: 1,
  },
  item: {
    padding: theme.spacing.level(1),
    paddingVertical: theme.spacing.level(3),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderColor: theme.pallete.white,
  },
  firstItemWrapper: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.pallete.white,
  },
  footer: {
    marginTop: theme.spacing.level(3),
    marginBottom: theme.spacing.level(3),
    alignItems: 'center',
  },
})

interface DrawerProps extends NavigationInjectedProps {
  activeItemKey?: string
  items: Route[]
  onItemPress: (event: { route: Route; focused: boolean }) => void
}

interface Route {
  key: string
  isTransitioning: boolean
  routeName: string
}

interface Scene {
  route: {}
  index: number
  focused: boolean
  tintColor: string
}

const Connect = createStateConnector(() => ({
  isDelegate: registration.selectors.isDelegate,
}))

export class Drawer extends React.Component<DrawerProps> {
  get items() {
    return this.props.items.filter(
      item => this.getNavigationOptions(item).drawerLabel,
    )
  }

  navigateToScreen = (route: Route) => () => {
    this.props.navigation.closeDrawer()
    this.props.navigation.navigate(route.routeName)
  }

  getRouteComponent(item: Route) {
    return Routes.get().allRoutes[item.routeName]
  }

  getNavigationOptions(item: Route) {
    const route = this.getRouteComponent(item)
    return Routes.get().getNavigationOptions(route, this.props as any)
  }

  render() {
    return (
      <Connect>
        {({ isDelegate }) => (
          <View style={style.root}>
            <View style={style.header} />
            <ScrollView style={style.items}>
              <TouchableOpacity
                key="<"
                style={style.item}
                onPress={() => {
                  this.props.navigation!.closeDrawer()
                }}
              >
                <FontAwesome
                  name="chevron-left"
                  color={theme.pallete.white}
                  size={26}
                />
              </TouchableOpacity>

              <View style={style.firstItemWrapper}>
                <TouchableOpacity
                  style={style.item}
                  onPress={() => {
                    Routes.get().goHome(this.props.navigation)
                    this.props.navigation.closeDrawer()
                  }}
                >
                  <Typography darkBg variant="screenHeader">
                    Home
                  </Typography>
                </TouchableOpacity>
              </View>

              {this.items.map(
                item =>
                  (isDelegate ||
                    !this.getNavigationOptions(item).delegateOnly) && (
                    <View key={item.routeName} style={style.itemWrapper}>
                      <TouchableOpacity
                        style={style.item}
                        onPress={this.navigateToScreen(item)}
                      >
                        <Typography darkBg variant="screenHeader">
                          {this.getNavigationOptions(item).drawerLabel}
                        </Typography>
                      </TouchableOpacity>
                    </View>
                  ),
              )}
            </ScrollView>

            <View style={style.footer}>
              <Logo
                fill={theme.pallete.white}
                width={moderateScale(125)}
                height={moderateScale(25)}
              />
            </View>
          </View>
        )}
      </Connect>
    )
  }
}
