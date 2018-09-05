import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from '../platform'

const style = StyleSheet.create({
  statusBar: {
    height: getStatusBarHeight(),
    width: '100%',
  },
})

export function StatusBar(props: {}) {
  return <View style={style.statusBar} />
}
