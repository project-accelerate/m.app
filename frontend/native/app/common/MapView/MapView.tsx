
import * as React from 'react'
import { ViewProps } from 'react-native'

/**
 * Third party types for expo don't include MapView
 * so we have this shim to make it all compile
 */
const ExpoMapView = require('expo').MapView

interface MapViewProps extends ViewProps {
  region: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }
}

interface MapViewMarkerProps extends ViewProps {
  coordinate: {
    latitude: number
    longitude: number
  }
  title: React.ReactNode
}

export const MapView = ExpoMapView as React.ComponentType<MapViewProps> & {
  Marker: React.ComponentType<MapViewMarkerProps>
}