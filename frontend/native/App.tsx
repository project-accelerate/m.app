import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createStackNavigator } from 'react-navigation'
import { HomeScreen } from './app/twt/Home/HomeScreen'
import { TimetableScreen } from './app/twt/Event/TimetableScreen'
import { graphQlClient } from './config/graphql'

const Navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Timetable: {
      screen: TimetableScreen,
    },
  },
  {},
)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={graphQlClient}>
        <Navigator />
      </ApolloProvider>
    )
  }
}
