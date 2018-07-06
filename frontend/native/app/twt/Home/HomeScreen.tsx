import * as React from 'react'
import { ButtonGrid, Button } from '../../common/Butttons/Buttons'
import {
  Background,
  MenuScreenLayout,
  Hero,
} from '../../common/Layouts/Layouts'

import logo from './twt.png'
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation'
import { Carousel } from '../../common/Carousel/Carousel';

export class HomeScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    header: null,
  }

  render() {
    return (
      <Background>
        <MenuScreenLayout>
          <Carousel />

          <ButtonGrid>
            <Button onPress={() => this.props.navigation.push('Timetable')}>
              Timetable
            </Button>
            <Button>News</Button>
            <Button>Meetups</Button>
            <Button>Votes</Button>
            <Button>Speakers</Button>
            <Button>Map</Button>
          </ButtonGrid>
        </MenuScreenLayout>
      </Background>
    )
  }
}
