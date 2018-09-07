import React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { Routes } from '../../../routes'
import { theme } from '../../../theme'
import { Typography } from '../Typography/Typography'
import { ProfileImage } from '../Widgets/Widgets'
import { HomeScreen } from '../../twt/Home/HomeScreen'
import { getStatusBarHeight } from '../platform'
import Logo from '../../../assets/mlogo.png'
import Arrow from '../../../assets/Arrow'

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
    borderBottomWidth: 1,
    borderBottomColor: theme.pallete.white,
  },
  footer: {
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

export class Drawer extends React.Component<DrawerProps> {
  get items() {
    return this.props.items.filter(
      item => this.getNavigationOptions(item).drawerLabel,
    )
  }

  home = this.props.items.find(x => x.routeName === HomeScreen.name)!

  navigateToScreen = (route: Route) => () => {
    this.props.onItemPress({
      route,
      focused: route.key === this.props.activeItemKey,
    })
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
      <View style={style.root}>
        <View style={style.header} />
        <ScrollView style={style.items}>
          <TouchableHighlight
            key="<"
            underlayColor={theme.pallete.white}
            style={style.item}
            onPress={() => {
              this.props.navigation!.closeDrawer()
            }}
          >
            <Arrow />
          </TouchableHighlight>

          {this.items.map(item => (
            <TouchableHighlight
              key={item.routeName}
              underlayColor={theme.pallete.white}
              style={style.item}
              onPress={this.navigateToScreen(item)}
            >
              <Typography darkBg variant="screenHeader">
                {this.getNavigationOptions(item).drawerLabel}
              </Typography>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={this.navigateToScreen(this.home)}
          style={style.footer}
        >
          <Image source={Logo} />
        </TouchableOpacity>
      </View>
    )
  }
}
