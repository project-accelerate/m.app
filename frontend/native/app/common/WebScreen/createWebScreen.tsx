import { StyleSheet, WebView } from 'react-native'
import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { BasicScreen } from '../Screen/BasicScreen'
import { LoadingOverlay } from '../Widgets/Widgets'
import { Card, CardHeader, CardContent, CardContainer } from '../Widgets/Card'
import { Typography } from '../Typography/Typography'
import * as theme from '../../../theme'

interface WebScreenConfig {
  url: string
  title: string
  drawerLabel?: string
  pendingMessage?: string
  pdf?: boolean
  delegateOnly?: boolean
}

const styles = StyleSheet.create({
  webscreen: {
    height: '100%',
  },
})

interface WebScreenState {
  status: 'loading' | 'ok' | 'not-ready'
}

export function createWebScreen(opts: WebScreenConfig) {
  return class extends React.Component<NavigationScreenProps, WebScreenState> {
    static navigationOptions = {
      drawerLabel: opts.drawerLabel || opts.title,
      headerTitle: opts.title,
      delegateOnly: opts.delegateOnly,
    }

    state: WebScreenState = { status: opts.pendingMessage ? 'loading' : 'ok' }

    async componentDidMount() {
      if (this.state.status === 'loading') {
        const res = await fetch(opts.url)
        console.log(res.ok)
        this.setState({ status: res.ok ? 'ok' : 'not-ready' })
      }
    }

    get url() {
      if (opts.pdf) {
        return `http://docs.google.com/gview?embedded=true&url=${opts.url}`
      }

      return opts.url
    }

    render() {
      return (
        <BasicScreen>
          {(this.state.status === 'loading' && <LoadingOverlay />) ||
            (this.state.status === 'not-ready' && (
              <CardContainer style={{ height: '100%' }}>
                <Card style={{ marginTop: theme.spacing.level(4) }}>
                  <CardHeader>{opts.pendingMessage}</CardHeader>
                  <CardContent>
                    <Typography>
                      We’ll add information here when it becomes available.
                    </Typography>
                  </CardContent>
                </Card>
              </CardContainer>
            )) || (
              <WebView
                style={styles.webscreen}
                source={{
                  uri: this.url,
                }}
              />
            )}
        </BasicScreen>
      )
    }
  }
}
