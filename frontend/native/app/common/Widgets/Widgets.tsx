import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ImageStyle,
  StyleProp,
  ImageBackground,
  Dimensions,
  ViewStyle,
} from 'react-native'
import { theme } from '../../../theme'

const LoadingOverlayStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export function LoadingOverlay() {
  return (
    <View style={LoadingOverlayStyle.container}>
      <ActivityIndicator />
    </View>
  )
}

const ProfileImageStyle = StyleSheet.create({
  small: {
    width: 96,
    height: 96,
  },
  fullWidth: {
    width: '100%',
  },
  halfSquare: {
    width: Dimensions.get('screen').width * 0.5,
    height: Dimensions.get('screen').width * 0.5,
  },
  halfScreen: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.4,
  },
})

interface ProfileImageProps {
  style?: StyleProp<ImageStyle>
  size?: keyof typeof ProfileImageStyle
  image: { sourceUrl: string } | number | null
  children?: React.ReactNode
}

export function ProfileImage({
  children,
  style,
  image,
  size = 'small',
}: ProfileImageProps) {
  if (!image) {
    return null
  }

  return (
    <ImageBackground
      style={[style, ProfileImageStyle[size]]}
      source={
        typeof image === 'number'
          ? image
          : { cache: 'force-cache', uri: image.sourceUrl }
      }
    >
      {children}
    </ImageBackground>
  )
}

const BannerStyles = StyleSheet.create({
  banner: {
    backgroundColor: theme.pallete.imageOverlay,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing.level(1),
  },
})

export function Banner({ children }: React.Props<{}>) {
  return <View style={BannerStyles.banner}>{children}</View>
}

const GridStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    padding: theme.spacing.level(1),
  },
})

export function Grid({
  children,
  style,
}: {
  children: React.ReactElement<{}>[]
  style?: StyleProp<ViewStyle>
}) {
  return (
    <View style={[GridStyles.grid, style]}>
      {children.map((child, i) => (
        <View key={child.key || i} style={GridStyles.item}>
          {child}
        </View>
      ))}
    </View>
  )
}
