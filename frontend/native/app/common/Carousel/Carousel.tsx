import React from 'react'
import faker from 'faker'
import SnapCarousel from 'react-native-snap-carousel'
import {
  Dimensions,
  ImageSourcePropType,
  Image,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native'
import jez from './jez.jpg'
import ash from './ash.jpg'
import skel from './skel.jpg'
import { theme } from '../../../theme'
import { Typography, Paragraphs } from '../Typography/Typography'

interface CarouselItem {
  id: string
  image: ImageSourcePropType
}

const CarouselStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  image: {
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    backgroundColor: theme.pallete.imageOverlay,
    color: theme.pallete.white,
    padding: theme.spacing.level(1),
    width: '100%',
    left: 0,
    bottom: 0,
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
})

export class Carousel extends React.Component {
  items: CarouselItem[] = [
    { id: 'jez', image: jez },
    { id: 'ash', image: ash },
    { id: 'skel', image: skel },
  ]

  render() {
    // center items on screen
    const { width } = Dimensions.get('window')

    return (
      <SnapCarousel
        autoplay
        loop
        layout="tinder"
        data={this.items}
        renderItem={({ item, index }) => (
          <ImageBackground
            style={CarouselStyles.container}
            imageStyle={CarouselStyles.image}
            source={item.image}
          >
            <Paragraphs style={CarouselStyles.text}>
              <Typography variant="cardTitle">{item.id}</Typography>
              <Typography>{faker.lorem.sentence()}</Typography>
            </Paragraphs>
          </ImageBackground>
        )}
        sliderWidth={width}
        itemWidth={width}
      />
    )
  }
}
