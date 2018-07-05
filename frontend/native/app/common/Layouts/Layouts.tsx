import React from 'react'
import { ImageBackground, StyleSheet, View, Image } from 'react-native'

import bg from './bg.jpg'
import { theme } from '../../../theme'

const LayoutStyles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.pallete.white,
  },
  bgImage: {
    opacity: 0.3,
  },
  menuScreen: {
    height: '100%',
    flexDirection: 'column',
  },
  menuScreenHeading: {
    position: 'relative',
    flex: 1,
    flexShrink: 1,
  },
  menu: {
    flex: 0,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface MenuScreenProps {
  children: React.ReactElement<{}>[]
}

export function MenuScreenLayout({ children }: MenuScreenProps) {
  return (
    <View style={LayoutStyles.menuScreen}>
      <View style={LayoutStyles.menuScreenHeading}>{children[0]}</View>
      <View style={LayoutStyles.menu}>{children[1]}</View>
    </View>
  )
}

export function Background({ children }: React.Props<{}>) {
  return (
    <ImageBackground
      source={bg}
      style={LayoutStyles.bg}
      imageStyle={LayoutStyles.bgImage}
    >
      {children}
    </ImageBackground>
  )
}

export function Hero(props: { src: number }) {
  return (
    <View style={LayoutStyles.hero}>
      <Image style={LayoutStyles.heroImage} source={props.src} />
    </View>
  )
}
