import * as React from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import * as faker from 'faker'
import {
  NavigationScreenOptions,
  NavigationInjectedProps,
} from 'react-navigation'
import twt from './TWTa_hdr.jpg'
import { theme } from '../../../theme'
import Logo from '../../../assets/mlogo.png'
import { ImageHeaderScreen } from '../../common/Screen/ImageHeaderScreen'
import {
  Card,
  CardHeader,
  CardSubheader,
  CardContainer,
  CardGroupHeader,
  CardContent,
} from '../../common/Widgets/Card'
import { times } from 'lodash'
import {
  HEADER_HEIGHT,
  HEADER_CONTENT_HEIGHT,
} from '../../common/Screen/HeaderBar'
import { getStatusBarHeight } from '../../common/platform'
import { createStateConnector } from '../../../state'
import { calendar } from '../Calendar/calendarState'
import { Touchable } from '../../common/Widgets/Widgets'
import { format, isSameDay } from 'date-fns'
import { TimeProvider } from '../../common/Time/TimeProvider'
import { Routes } from '../../../routes'
import { Home } from './Home'

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

const Connect = createStateConnector(() => ({
  events: calendar.selectors.upcomingEvents,
}))

export class HomeScreen extends React.Component<NavigationInjectedProps> {
  static navigationOptions: NavigationScreenOptions = {}

  handleEventPress = (e: calendar.SavedEventDetails) => {
    this.props.navigation.push(new Routes().getRoutename('EventDetailScreen'), {
      id: e.id,
      title: e.name,
      image: e.imageUrl,
    })
  }

  render() {
    return (
      <Connect>
        {({ events }) => (
          <TimeProvider granularity="minutes">
            {time => (
              <Home
                events={events}
                time={time}
                onEventPress={this.handleEventPress}
              />
            )}
          </TimeProvider>
        )}
      </Connect>
    )
  }
}
