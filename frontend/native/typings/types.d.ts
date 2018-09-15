declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.graphql'

declare module 'react-native-markdown-view' {
  import React from 'react'
  import { StyleProp, TextStyle, ViewProps } from 'react-native'

  interface MarkdownViewProps {
    children: string
    styles: Record<string, StyleProp<TextStyle>>
  }

  export const MarkdownView: React.ComponentType<MarkdownViewProps>
}

declare module 'react-native-parallax-header'

declare module 'react-native-expo-image-cache' {
  import * as RN from 'react-native'
  import * as React from 'react'
  export const Image: React.ComponentType<
    RN.ViewProps & { uri?: string; preview?: string }
  >
}

declare module 'react-native-size-matters' {
  export function scale(size: number): number
  export function verticalScale(size: number): number
  export function moderateScale(size: number, factor?: number): number

  type NamedStyles<T> = {
    [P in keyof T]:
      | ReactNative.ViewStyle
      | ReactNative.TextStyle
      | ReactNative.ImageStyle
  }
  type Scaled<T> = {
    [P in keyof T]: T[P] extends number ? T[P] | string : T[P]
  }

  export namespace ScaledSheet {
    export function create<T extends NamedStyles<T>>(
      stylesObject: T,
    ): { [P in keyof T]: Scaled<ReactNative.RegisteredStyle<T[P]>> }
  }
}
