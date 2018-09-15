import { ImageProps, Animated, Image } from 'react-native'
import * as Cached from 'react-native-expo-image-cache'
import React from 'react'

export class CachedImage extends React.Component<
  ImageProps & { preview?: string }
> {
  render() {
    const { preview, source, ...imageProps } = this.props
    if (typeof source === 'number') {
      return <Image source={source} {...imageProps} />
    }

    return (
      <Cached.Image
        preview={preview}
        uri={Array.isArray(source) ? source[0].uri : source.uri}
        {...imageProps}
      />
    )
  }
}

export const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage)
