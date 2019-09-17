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
import * as theme from '../../../theme'
import { Typography, Paragraphs } from '../Typography/Typography'

interface CarouselItem {
  id: string
  image: ImageSourcePropType
  title: string
  info: string
}

const CarouselStyles = StyleSheet.create({
  root: {
    backgroundColor: theme.pallete.black,
  },
  container: {
    backgroundColor: theme.pallete.accent,
  },
  image: {
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: theme.pallete.imageOverlay,
    padding: theme.spacing.level(1),
    width: '100%',
    left: 0,
    bottom: 0,
  },
  text: {
    color: theme.pallete.white,
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
    {
      id: 'jez',
      image: jez,
      title: 'Headline 1',
      info: faker.lorem.sentences(),
    },
    {
      id: 'ash',
      image: ash,
      title: 'Headline 2',
      info: faker.lorem.sentences(),
    },
  ]

  render() {
    // center items on screen
    const { width } = Dimensions.get('window')

    return (
      <View style={CarouselStyles.root}>
        <SnapCarousel
          autoplay
          loop
          layout="stack"
          data={this.items}
          renderItem={({ item, index }) => (
            <ImageBackground
              style={CarouselStyles.container}
              imageStyle={CarouselStyles.image}
              source={item.image}
            >
              <Paragraphs
                style={CarouselStyles.textContainer}
                textStyle={CarouselStyles.text}
              >
                <Typography variant="cardTitle">{item.title}</Typography>
                <Typography>{item.info}</Typography>
              </Paragraphs>
            </ImageBackground>
          )}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
    )
  }
}
