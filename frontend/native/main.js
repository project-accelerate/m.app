import Expo from 'expo'
import React, { Component } from 'react'
import { View } from 'react-native'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  Expo.KeepAwake.activate()
}

Expo.registerRootComponent(App)
