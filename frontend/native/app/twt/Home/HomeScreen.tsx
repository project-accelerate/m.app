import * as React from 'react'
import faker from 'faker'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation'
import { Carousel } from '../../common/Carousel/Carousel'
import { Screen, ProfileImage } from '../../common/Widgets/Widgets'
import twt from './twt.png'
import { theme } from '../../../theme'
import { Typography, Br } from '../../common/Typography/Typography'

const style = StyleSheet.create({
  logo: {
    marginVertical: theme.spacing.level(5),
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

export class HomeScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {}

  render() {
    return (
      <Screen floatMenu>
        <View style={style.container}>
          <ProfileImage style={style.logo} size="small" image={twt} />
        </View>
        <ScrollView
          flex={1}
          padding={theme.spacing.level(1)}
          backgroundColor={theme.pallete.accent}
        >
          <View
            borderWidth={2}
            borderColor="white"
            style={{ marginBottom: theme.spacing.level(1) }}
            padding={theme.spacing.level(1)}
          >
            <Typography darkBg variant="cardTitle">
              Upcoming:
            </Typography>
            <Typography
              darkBg
              style={{ lineHeight: 25, marginTop: theme.spacing.level(1) }}
            >
              <Typography darkBg variant="accent2">
                Vote:
              </Typography>{' '}
              11:30am Conference Center<Br />
              <Typography darkBg variant="accent2">
                Talk:
              </Typography>{' '}
              1pm In and Aganst the State
            </Typography>
          </View>
          <View
            borderWidth={2}
            borderColor="white"
            padding={theme.spacing.level(1)}
          >
            <Typography darkBg variant="cardTitle">
              News:
            </Typography>
            <Typography
              darkBg
              style={{ lineHeight: 18, marginTop: theme.spacing.level(1) }}
            >
              {faker.lorem.sentences(5)}
            </Typography>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}
