import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

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
