import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createDrawerNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { RegistrationContainer } from './app/twt/Registration/RegistrationContainer'
import { setupAppUpdates } from './config/appUpdates'
import { graphQlClient } from './config/graphql'
import { topLevelRoutes } from './routes'
import { Drawer } from './app/common/Drawer/Drawer'
import { ReduxProvider } from './config/redux'

interface ApplicationState {
  loading?: boolean
}

export default class App extends React.Component {
  state: ApplicationState = {
    loading: true,
  }

  navigator = createDrawerNavigator(topLevelRoutes, {
    initialRouteName: 'HomeScreen',
    contentComponent: Drawer,
  })

  async componentDidMount() {
    await Promise.all([setupAppUpdates(), ReduxProvider.setup()])
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return <AppLoading />
    }

    return (
      <ApolloProvider client={graphQlClient}>
        <ReduxProvider>
          <RegistrationContainer>
            <this.navigator />
          </RegistrationContainer>
        </ReduxProvider>
      </ApolloProvider>
    )
  }
}
