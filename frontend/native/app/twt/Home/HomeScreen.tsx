import * as React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import * as faker from 'faker'
import { NavigationScreenOptions, NavigationInjectedProps } from 'react-navigation'
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
import { createStateConnector } from '../../../state';
import { calendar } from '../Calendar/calendarState';
import { Touchable } from '../../common/Widgets/Widgets';
import { format, isSameDay } from 'date-fns';
import { TimeProvider } from '../../common/Time/TimeProvider';
import { Routes } from '../../../routes';

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
  events: calendar.selectors.upcomingEvents
}))

export class HomeScreen extends React.Component<NavigationInjectedProps> {
  static navigationOptions: NavigationScreenOptions = {}

  navigateToEvent(e: { id: string, name: string }) {
    this.props.navigation.navigate({
      routeName: new Routes().getRoutename('EventDetailScreen'),
      params: {
        id: e.id,
        title: e.name
      }
    })
  }

  render() {
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
          <Connect>
          {
            ({ events }) => (
              events.length > 0 && (
                <View>
                  <CardGroupHeader>Upcoming</CardGroupHeader>
                  <TimeProvider granularity="minutes">
                  {
                    (time) => (
                      events.map(e => (
                        <Touchable key={e.id} onPress={() => this.navigateToEvent(e)}>
                          <Card>
                            <CardSubheader>{isSameDay(e, e.startTime) ? 'Today' : format(e.startTime, 'ddd')} {format(e.startTime, 'HH:MM')}</CardSubheader>
                            <CardHeader>{e.name}</CardHeader>
                          </Card>
                        </Touchable>
                      ))
                    )
                  }
                  </TimeProvider>>
                </View>
              )
            )
          }
          </Connect>
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
}
