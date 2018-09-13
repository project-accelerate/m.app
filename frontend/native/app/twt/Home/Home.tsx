import * as React from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import * as faker from 'faker'
import {
  NavigationScreenOptions,
  NavigationInjectedProps,
} from 'react-navigation'
import twt from './TWTa_hdr.jpg'
import { theme } from '../../../theme'
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
import Logo from '../../../assets/Mlogo'

const style = StyleSheet.create({
  parallaxContainer: {
    backgroundColor: theme.pallete.box,
  },
  container: {
    height: '50%',
    flexDirection: 'column',
    backgroundColor: theme.pallete.black,
    alignItems: 'center',
  },
  logo: {
    // No idea either...
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
  },
})

export interface HomeProps {
  time: Date
  events: calendar.SavedEventDetails[]
  onEventPress: (event: calendar.SavedEventDetails) => void
}

export function Home({ time, events, onEventPress }: HomeProps) {
  return (
    <ImageHeaderScreen
      noBackButton
      containerStyle={style.parallaxContainer}
      image={twt}
      title={
        <View style={style.logo}>
          <Logo fill={theme.pallete.white} width="120" height="50" />
        </View>
      }
    >
      <CardContainer>
        {events.length > 0 && (
          <View>
            <CardGroupHeader>Upcoming</CardGroupHeader>
            {events.map(e => (
              <TouchableOpacity key={e.id} onPress={() => onEventPress(e)}>
                <Card>
                  <CardSubheader>
                    {isSameDay(time, e.startTime)
                      ? 'Today'
                      : format(e.startTime, 'ddd')}{' '}
                    {format(e.startTime, 'HH:MM')}
                  </CardSubheader>
                  <CardHeader>{e.name}</CardHeader>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <CardGroupHeader>News</CardGroupHeader>
        {times(10, i => (
          <Card key={i}>
            <CardHeader>{faker.lorem.words(4)}</CardHeader>
            <CardContent>{faker.lorem.sentences(3)}</CardContent>
          </Card>
        ))}
      </CardContainer>
    </ImageHeaderScreen>
  )
}
