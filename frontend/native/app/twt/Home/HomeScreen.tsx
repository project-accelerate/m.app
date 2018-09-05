import * as React from 'react'
import faker from 'faker'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation'
import { Screen, ProfileImage } from '../../common/Widgets/Widgets'
import twt from './TWTa_hdr.jpg'
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

export class HomeScreen extends React.Component {
  static navigationOptions: NavigationScreenOptions = {}

  render() {
    return (
      <Screen floatMenu noBackButton>
        <ProfileImage size="halfScreen" image={twt} />
      </Screen>
    )
  }
}
