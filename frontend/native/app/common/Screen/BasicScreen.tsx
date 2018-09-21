import * as React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { ErrorGuard } from '../ErrorView/ErrorGuard'
import { HeaderBar, HEADER_HEIGHT } from './HeaderBar'
import { NotificationListener } from '../Notification/NotificationListener'

interface BasicScreenProps extends React.Props<{}> {
  noBackButton?: boolean
}

const BasicScreenStyles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
  content: {
    position: 'relative',
    width: '100%',
    flex: 1,
  },
})

export function BasicScreen({ children, noBackButton }: BasicScreenProps) {
  return (
    <ErrorGuard>
      <View style={BasicScreenStyles.screen}>
        <NotificationListener />
        <HeaderBar noBackButton={noBackButton} />
        <View style={BasicScreenStyles.content}>{children}</View>
      </View>
    </ErrorGuard>
  )
}
