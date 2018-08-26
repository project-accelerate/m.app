import Expo from 'expo'
import React, { Component } from 'react'
import { View } from 'react-native'
import App from './App'

if (__DEV__) {
  Expo.KeepAwake.activate()
}

Expo.registerRootComponent(App)
