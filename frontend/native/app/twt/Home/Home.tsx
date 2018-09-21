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
import {
  HEADER_HEIGHT,
  HEADER_CONTENT_HEIGHT,
} from '../../common/Screen/HeaderBar'
import { getStatusBarHeight } from '../../common/platform'
import { calendar } from '../Calendar/calendarState'
import { isSameDay } from 'date-fns'
import Logo from '../../../assets/Mlogo'
import { Typography } from '../../common/Typography/Typography'
import { moderateScale } from 'react-native-size-matters'
import { timeOf, weekdayOf } from '../../common/date-formats'
import { NewsPanel } from '../News/NewsPanel'
import { NewsPanelFragment } from '../../../queries'

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
  news: NewsPanelFragment[]
  events: calendar.SavedEventDetails[]
  onEventPress: (event: calendar.SavedEventDetails) => void
  onNewsPress: (news: string) => void
}

export function Home({
  news,
  time,
  events,
  onEventPress,
  onNewsPress,
}: HomeProps) {
  return (
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
                    : weekdayOf(e.startTime)}{' '}
                  {timeOf(e.startTime)}
                </CardSubheader>
                <CardHeader>{e.name}</CardHeader>
                <CardContent>
                  <Typography variant="body">{e.venueName}</Typography>
                </CardContent>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <CardGroupHeader>News</CardGroupHeader>
      {news.map(newsItem => (
        <NewsPanel key={newsItem.id} news={newsItem} onPress={onNewsPress} />
      ))}
    </CardContainer>
  )
}
