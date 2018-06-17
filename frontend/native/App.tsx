import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthGuardProvider, LoggedInGuard } from 'frontend.common/auth'
import { auth } from './config/auth'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js!!!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
