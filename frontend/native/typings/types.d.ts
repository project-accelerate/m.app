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
