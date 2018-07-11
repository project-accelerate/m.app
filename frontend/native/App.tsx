import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createStackNavigator } from 'react-navigation'
import { HomeScreen } from './app/twt/Home/HomeScreen'
import { TimetableScreen } from './app/twt/Event/TimetableScreen'
import { graphQlClient } from './config/graphql'
import { theme } from './theme'
import { routes } from './routes'
import { Updates } from 'expo'
import { AppState } from 'react-native'

const Navigator = createStackNavigator(routes, {
  navigationOptions: {
    headerTintColor: theme.pallete.white,
    headerStyle: {
      backgroundColor: theme.pallete.header,
    },
  },
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={graphQlClient}>
        <Navigator />
      </ApolloProvider>
    )
  }
}

AppState.addEventListener('change', async state => {
  if (!__DEV__ && state === 'active') {
    const update = await Updates.fetchUpdateAsync()

    if (update.isNew) {
      Updates.reloadFromCache()
    }
  }
})
