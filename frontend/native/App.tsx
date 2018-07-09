import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createStackNavigator } from 'react-navigation'
import { HomeScreen } from './app/twt/Home/HomeScreen'
import { TimetableScreen } from './app/twt/Event/TimetableScreen'
import { graphQlClient } from './config/graphql'
import { theme } from './theme'
import { routes } from './routes'

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
