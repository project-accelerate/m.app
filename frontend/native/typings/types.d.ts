declare module '*.png'
declare module '*.jpg'
declare module '*.graphql'

declare module 'react-native-markdown-view' {
  import React from 'react'
  import { StyleProp, TextStyle } from 'react-native'

  interface MarkdownViewProps {
    children: string
    styles: Record<string, StyleProp<TextStyle>>
  }

  export const MarkdownView: React.ComponentType<MarkdownViewProps>
}
