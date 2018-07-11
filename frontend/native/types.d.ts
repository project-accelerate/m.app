import { StyleProp, TextStyle } from 'react-native'

declare module '*.png'
declare module '*.jpg'
declare module '*.graphql'

declare module 'react-native-markdown-view' {
  import React from 'react'

  interface MarkdownViewProps {
    children: string
    styles: Record<string, StyleProp<TextStyle>>
  }

  export const MarkdownView: React.ComponentType<MarkdownViewProps>
}
