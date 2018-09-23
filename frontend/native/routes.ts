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
import { SubmitMeetupScreen } from './app/twt/SubmitMeetup/SubmitMeetupScreen'
import { VotesScreen } from './app/twt/Event/VotesScreen'
import { SettingsScreen } from './app/twt/Settings/SettingsScreen'
import { createWebScreen } from './app/common/WebScreen/createWebScreen'
import {
  TWTFeedbackScreen,
  SessionFeedbackScreen,
  FeedbackScreen,
} from './app/twt/Feedback/FeedbackScreen'
import { NewsScreen } from './app/twt/News/NewsScreen'
import { NewsDetailScreen } from './app/twt/News/NewsDetailScreen'
import { startOfDay } from 'date-fns'

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

  home = 'HomeScreen'

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
    TWTFeedbackScreen,
    SessionFeedbackScreen,
    NewsDetailScreen,
  }

  topLevelRoutes = {
    ...this.createRootNavigator(HomeScreen, this.home),
    ...this.createRootNavigator(
      createWebScreen({
        url: 'https://peoplesmomentum.com/conference-2018-daily-briefing',
        title: 'Daily Briefing',
        drawerLabel: 'Daily Briefing',
        pendingMessage: 'The daily briefing isn’t ready yet',
        delegateOnly: true,
      }),
      'DailyBriefing',
    ),
    ...this.createRootNavigator(NewsScreen, 'NewsScreen'),
    ...this.createRootNavigator(TimetableScreen, 'TimetableScreen'),
    ...this.createRootNavigator(CalendarScreen, 'CalendarScreen'),
    ...this.createRootNavigator(
      createWebScreen({
        url: 'https://peoplesmomentum.com/conference-2018-yellow-pages',
        title: 'Yellow Pages',
        drawerLabel: 'Yellow Pages',
        pendingMessage: 'The Yellow Pages isn’t out yet',
        delegateOnly: true,
      }),
      'YellowPages',
    ),
    ...this.createRootNavigator(
      createWebScreen({
        url:
          'https://soundcloud.com/user-189667110/sets/a-radical-history-tour-of-liverpool',
        title: 'A Radical History Tour of Liverpool',
        drawerLabel: 'Radical History Tour',
      }),
      'WalkingTour',
    ),
    // ...this.createRootNavigator(FeedbackScreen, 'FeedbackScreen'),
    ...this.createRootNavigator(SubmitMeetupScreen, 'SubmitMeetupScreen'),
    ...this.createRootNavigator(SettingsScreen, 'SettingsScreen'),
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

  findKeyFor(screen: React.ComponentType<any>) {
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
