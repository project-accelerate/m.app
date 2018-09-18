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
import twt from '../../../assets/default.jpg'
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
import { Br, Markdown, Typography } from '../../common/Typography/Typography'
import { MarkdownView } from 'react-native-markdown-view'
import { moderateScale } from 'react-native-size-matters'
import { timeOf, weekdayOf } from '../../common/date-formats'

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
      parralax
      containerStyle={style.parallaxContainer}
      image={twt}
      title={
        <View style={style.logo}>
          <Logo
            fill={theme.pallete.white}
            width={moderateScale(120)}
            height={moderateScale(50)}
          />
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
        <Card>
          <CardHeader>TWT Programme is Live!</CardHeader>
          <CardContent>
            <Markdown value={firstItem} />
          </CardContent>
        </Card>
      </CardContainer>
    </ImageHeaderScreen>
  )
}

const firstItem = `The programme for TWT is out now. If you’re interested in a session or workshop, you can save it to your calendar. We’ll remind you about it half an hour before it starts.

This year’s festival will double in size, platform voices from all over the world, and have a more innovative programme than ever before. TWT 2018 will create an open space for collective political education that will strengthen our entire movement.`
