import {
  createStackNavigator,
  NavigationScreenOptions,
  NavigationScreenProps,
  NavigationScreenProp,
} from 'react-navigation'
import { HomeScreen } from './app/twt/Home/HomeScreen'
import { TimetableScreen } from './app/twt/Event/TimetableScreen'
import { EventDetailScreen } from './app/twt/Event/EventDetailScreen'
import { CalendarScreen } from './app/twt/Calendar/CalendarScreen'
import { theme } from './theme'
import { DevPanel } from './devtool/DevPanel'

export interface RouteComponent extends React.ComponentClass<any> {
  navigationOptions:
    | NavigationScreenOptions
    | ((props: NavigationScreenProps) => NavigationScreenOptions)
}

export type RouteKey = keyof Routes['nonTopLevelRoutes']

export class Routes {
  private static instance: Routes

  static get() {
    Routes.instance = new Routes()
    return Routes.instance
  }

  private devOnlyRoutes = __DEV__
    ? { DevPanel: this.createRootNavigator(DevPanel) }
    : {}

  getNavigationOptions(
    component: RouteComponent | undefined,
    navigation: NavigationScreenProp<{}>,
  ) {
    if (!component) {
      return {}
    }

    return typeof component.navigationOptions === 'function'
      ? component.navigationOptions({ navigation } as any)
      : component.navigationOptions
  }
  nonTopLevelRoutes = {
    EventDetailScreen,
  }

  topLevelRoutes = {
    HomeScreen: this.createRootNavigator(HomeScreen),
    TimetableScreen: this.createRootNavigator(TimetableScreen),
    CalendarScreen: this.createRootNavigator(CalendarScreen),
    ...this.devOnlyRoutes,
  }

  allRoutes: Record<string, RouteComponent | undefined> = {
    ...this.nonTopLevelRoutes,
    ...this.topLevelRoutes,
  }

  isTopLevel(name: string) {
    return name in this.topLevelRoutes
  }

  resolve(name: string) {
    return this.allRoutes[name]
  }

  getRoutename(key: RouteKey) {
    return key
  }

  private createRootNavigator(parent: RouteComponent) {
    const availableRoutes = {
      [parent.name]: parent,
      ...this.nonTopLevelRoutes,
    }

    const navigator = createStackNavigator(availableRoutes, {
      initialRouteName: parent.name,
      navigationOptions: {
        headerTintColor: theme.pallete.white,
        header: null,
      },
    })

    navigator.navigationOptions = parent.navigationOptions
    return navigator
  }
}
