import * as React from 'react'
import { ButtonGrid, Button } from '../../common/Butttons/Buttons'
import {
  Background,
  MenuScreenLayout,
  Hero,
} from '../../common/Layouts/Layouts'

import logo from './twt.png'

export class HomeScreen extends React.Component {
  render() {
    return (
      <Background>
        <MenuScreenLayout>
          <Hero src={logo} />

          <ButtonGrid>
            <Button>Timetable</Button>
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
