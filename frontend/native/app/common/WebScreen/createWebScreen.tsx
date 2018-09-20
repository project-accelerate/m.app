import { StyleSheet, WebView } from 'react-native'
import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { BasicScreen } from '../Screen/BasicScreen'

interface WebScreenConfig {
  url: string
  title: string
  drawerLabel?: string
}

const styles = StyleSheet.create({
  webscreen: {
    height: '100%',
  },
})

export function createWebScreen(opts: WebScreenConfig) {
  return class extends React.Component<NavigationScreenProps> {
    static navigationOptions: NavigationScreenOptions = {
      drawerLabel: opts.drawerLabel || opts.title,
      headerTitle: opts.title,
    }

    render() {
      return (
        <BasicScreen>
          <WebView
            style={styles.webscreen}
            source={{
              uri: opts.url,
            }}
          />
        </BasicScreen>
      )
    }
  }
}
