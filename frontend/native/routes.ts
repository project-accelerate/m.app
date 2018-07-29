import {
  createStackNavigator,
  NavigationScreenOptions,
  NavigationActions,
  NavigationScreenProps,
  NavigationScreenProp,
} from 'react-navigation'
import { HomeScreen } from './app/twt/Home/HomeScreen'
import { TimetableScreen } from './app/twt/Event/TimetableScreen'
import { EventDetailScreen } from './app/twt/Event/EventDetailScreen'
import { theme } from './theme'

export interface RouteComponent extends React.ComponentClass<any> {
  navigationOptions:
    | NavigationScreenOptions
    | ((props: NavigationScreenProps) => NavigationScreenOptions)
}

export function getNavigationOptions(
  component: RouteComponent,
  navigation: NavigationScreenProp<{}>,
) {
  return typeof component.navigationOptions === 'function'
    ? component.navigationOptions({ navigation } as any)
    : component.navigationOptions
}

export const nonTopLevelRoutes = {
  EventDetailScreen,
}

export const topLevelRoutes = {
  HomeScreen: createRootNavigator(HomeScreen),
  TimetableScreen: createRootNavigator(TimetableScreen),
}

export const allRoutes: Record<string, RouteComponent | undefined> = {
  ...nonTopLevelRoutes,
  ...topLevelRoutes,
}

export type RouteKey = keyof typeof nonTopLevelRoutes

export function getRoutename(key: RouteKey) {
  return key
}

function createRootNavigator(root: RouteComponent) {
  const availableRoutes = {
    [root.name]: root,
    ...nonTopLevelRoutes,
  }

  const navigator = createStackNavigator(availableRoutes, {
    initialRouteName: root.name,
    navigationOptions: {
      headerTintColor: theme.pallete.white,
      header: null,
    },
  })

  navigator.navigationOptions = root.navigationOptions
  return navigator
}
