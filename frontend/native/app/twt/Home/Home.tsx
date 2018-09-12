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
        <View
          style={{
            height: HEADER_HEIGHT - theme.spacing.level(1) * 2,
            paddingTop: getStatusBarHeight(),
          }}
        >
          <Image flex={1} resizeMode="contain" source={Logo} />
        </View>
      }
    >
      <CardContainer>
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
