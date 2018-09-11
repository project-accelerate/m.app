import * as React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import * as faker from 'faker'
import { NavigationScreenOptions } from 'react-navigation'
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

export class HomeScreen extends React.Component {
  static navigationOptions: NavigationScreenOptions = {}

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
          <CardGroupHeader>Upcoming</CardGroupHeader>
          <Card>
            <CardSubheader>Today 11:00</CardSubheader>
            <CardHeader>{faker.lorem.words(3)}</CardHeader>
          </Card>
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
