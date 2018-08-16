import React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { Routes } from '../../../routes'
import { theme } from '../../../theme'
import { Typography } from '../Typography/Typography'
import twt from '../twt.png'
import { ProfileImage } from '../Widgets/Widgets'
import { HomeScreen } from '../../twt/Home/HomeScreen'
import { getStatusBarHeight } from '../platform'

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
    backgroundColor: theme.pallete.white,
    padding: theme.spacing.level(2),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 1,
  },
  footer: {
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
          {this.items.map(item => (
            <TouchableHighlight
              key={item.routeName}
              underlayColor={theme.pallete.accent}
              style={style.item}
              onPress={this.navigateToScreen(item)}
            >
              <Typography variant="accent2">
                {this.getNavigationOptions(item).drawerLabel}
              </Typography>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={this.navigateToScreen(this.home)}
          style={style.footer}
        >
          <ProfileImage size="small" image={twt} />
        </TouchableOpacity>
      </View>
    )
  }
}
