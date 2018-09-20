import Expo from 'expo'
import React, { Component } from 'react'
import { View } from 'react-native'
import App from './App'
import Sentry from 'sentry-expo'
import { SENTRY_URL } from './config/properties'

Sentry.config(SENTRY_URL).install()

if (__DEV__) {
  Expo.KeepAwake.activate()
}

Expo.registerRootComponent(App)
