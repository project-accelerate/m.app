import * as React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation'
import { Carousel } from '../../common/Carousel/Carousel'
import { Screen, ProfileImage } from '../../common/Widgets/Widgets'
import twt from './twt.png'
import { theme } from '../../../theme'

const style = StyleSheet.create({
  logo: {
    marginVertical: theme.spacing.level(5),
  },
  container: {
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
      </Screen>
    )
  }
}
