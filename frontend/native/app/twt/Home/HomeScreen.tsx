import * as React from 'react'
import { StyleSheet } from 'react-native'
import HomeScreenQueryDocument from './HomeScreen.graphql'
import {
  NavigationScreenOptions,
  NavigationInjectedProps,
} from 'react-navigation'
import { theme } from '../../../theme'
import {
  Card,
  CardHeader,
  CardSubheader,
  CardContainer,
  CardGroupHeader,
  CardContent,
} from '../../common/Widgets/Card'
import {
  HEADER_HEIGHT,
  HEADER_CONTENT_HEIGHT,
} from '../../common/Screen/HeaderBar'
import { createParametricStateConnector } from '../../../state'
import { calendar } from '../Calendar/calendarState'
import { TimeProvider } from '../../common/Time/TimeProvider'
import { Routes } from '../../../routes'
import { EventDetailScreen } from '../Event/EventDetailScreen'
import { registration } from '../Registration/registrationState'
import { createFetchData } from '../../common/FetchData/FetchData'
import { HomeScreenQuery, HomeScreenQueryVariables } from '../../../queries'
import { Home } from './Home'
import { NewsDetailScreen } from '../News/NewsDetailScreen'

const style = StyleSheet.create({
  logo: {
    marginVertical: theme.spacing.level(5),
  },
  parallaxContainer: {
    backgroundColor: theme.pallete.box,
  },
  container: {
    height: '50%',
    flexDirection: 'column',
    backgroundColor: theme.pallete.black,
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    position: 'relative',
  },
})

const Connect = createParametricStateConnector<{ now: Date }>()(() => ({
  events: calendar.selectors.upcomingEvents,
  user: registration.selectors.userId,
}))

const FetchData = createFetchData<HomeScreenQuery, HomeScreenQueryVariables>({
  query: HomeScreenQueryDocument,
})

export class HomeScreen extends React.Component<NavigationInjectedProps> {
  static navigationOptions: NavigationScreenOptions = {}

  handleEventPress = (e: calendar.SavedEventDetails) => {
    Routes.get().push(this.props.navigation, EventDetailScreen, {
      id: e.id,
      title: e.name,
      image: e.imageUrl,
    })
  }

  handleNewsPress = (id: string) => {
    Routes.get().push(this.props.navigation, NewsDetailScreen, { id })
  }

  render() {
    return (
      <TimeProvider granularity="minutes">
        {time => (
          <Connect now={time}>
            {({ events, user }) => (
              <FetchData variables={{ user }}>
                {({ data }) => (
                  <Home
                    events={events}
                    news={data.news.edges.map(e => e.node)}
                    time={time}
                    onEventPress={this.handleEventPress}
                    onNewsPress={this.handleNewsPress}
                  />
                )}
              </FetchData>
            )}
          </Connect>
        )}
      </TimeProvider>
    )
  }
}
