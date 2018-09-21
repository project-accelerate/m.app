import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { ErrorGuard } from '../ErrorView/ErrorGuard'
import { HeaderBar } from './HeaderBar'
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
    flexGrow: 1,
    position: 'relative',
  },
})

export function BasicScreen({ children, noBackButton }: BasicScreenProps) {
  return (
    <ErrorGuard>
      <View style={BasicScreenStyles.screen}>
        <NotificationListener />
        <HeaderBar noBackButton={noBackButton} />
        {children}
      </View>
    </ErrorGuard>
  )
}
