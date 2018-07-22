import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createStackNavigator } from 'react-navigation'
import { graphQlClient } from './config/graphql'
import { theme } from './theme'
import { routes } from './routes'
import { RegistrationContainer } from './app/twt/Registration/RegistrationContainer'
import { setupAppUpdates } from './config/appUpdates'
import { AppLoading } from 'expo'

interface ApplicationState {
  loading?: boolean
}

export default class App extends React.Component {
  state: ApplicationState = {
    loading: true,
  }

  navigator = createStackNavigator(routes, {
    navigationOptions: {
      headerTintColor: theme.pallete.white,
      headerStyle: {
        backgroundColor: theme.pallete.header,
      },
    },
  })

  async componentDidMount() {
    await Promise.all([setupAppUpdates(), RegistrationContainer.setup()])

    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return <AppLoading />
    }

    return (
      <ApolloProvider client={graphQlClient}>
        <RegistrationContainer>
          <this.navigator />
        </RegistrationContainer>
      </ApolloProvider>
    )
  }
}
