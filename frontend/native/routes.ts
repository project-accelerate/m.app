import {
  createStackNavigator,
  NavigationScreenOptions,
  NavigationScreenProps,
  NavigationScreenProp,
  NavigationProp,
} from 'react-navigation'
import { HomeScreen } from './app/twt/Home/HomeScreen'
import { TimetableScreen } from './app/twt/Event/TimetableScreen'
import { EventDetailScreen } from './app/twt/Event/EventDetailScreen'
import { SpeakerDetailScreen } from './app/twt/Speaker/SpeakerDetailScreen'
import { CalendarScreen } from './app/twt/Calendar/CalendarScreen'
import { theme } from './theme'
import { DevPanel } from './devtool/DevPanel'
import { VotesScreen } from './app/twt/Event/VotesScreen'

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

  push<Params>(
    navigation: NavigationScreenProp<any, any>,
    screen: React.ComponentType<NavigationScreenProps<Params>>,
    params: Params,
  ): void
  push(
    navigation: NavigationScreenProp<any, any>,
    screen: React.ComponentType<NavigationScreenProps>,
  ): void
  push(
    navigation: NavigationScreenProp<any, any>,
    screen: React.ComponentType<NavigationScreenProps<any>>,
    params?: any,
  ): void {
    navigation.push(this.findKeyFor(screen), params)
  }

  get home() {
    return this.findKeyFor(HomeScreen)
  }

  goHome(navigation: NavigationScreenProp<any, any>) {
    navigation.navigate(this.home)
  }

  getNavigationOptions(
    component: RouteComponent | undefined,
    navigation: NavigationScreenProp<{}>,
  ): NavigationScreenOptions & { delegateOnly?: boolean } {
    if (!component) {
      return {}
    }

    return typeof component.navigationOptions === 'function'
      ? component.navigationOptions({ navigation } as any)
      : component.navigationOptions
  }

  nonTopLevelRoutes = {
    EventDetailScreen,
    SpeakerDetailScreen,
  }

  topLevelRoutes = {
    ...this.createRootNavigator(HomeScreen, 'HomeScreen'),
    ...this.createRootNavigator(TimetableScreen, 'TimetableScreen'),
    ...this.createRootNavigator(CalendarScreen, 'CalendarScreen'),
    ...this.createRootNavigator(VotesScreen, 'VotesScreen'),
    ...(__DEV__ ? this.createRootNavigator(DevPanel, 'DevPanel') : {}),
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

  private findKeyFor(screen: React.ComponentType<any>) {
    const candidates: any = this.nonTopLevelRoutes
    const key = Object.keys(this.nonTopLevelRoutes).find(
      key => candidates[key] === screen,
    )
    if (!key) {
      throw Error(`${screen.displayName} doesn't seem to be a pushable route`)
    }

    return key
  }

  private createRootNavigator(parent: RouteComponent, key: string) {
    const availableRoutes = {
      [key]: parent,
      ...this.nonTopLevelRoutes,
    }

    const navigator = createStackNavigator(availableRoutes, {
      initialRouteName: key,
      navigationOptions: {
        headerTintColor: theme.pallete.white,
        header: null,
      },
    })

    navigator.navigationOptions = parent.navigationOptions
    return { [key]: navigator }
  }
}
