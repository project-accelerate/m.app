import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createDrawerNavigator, NavigationRouter } from 'react-navigation'
import { AppLoading, Notifications } from 'expo'
import { RegistrationContainer } from './app/twt/Registration/RegistrationContainer'
import { setupAppUpdates } from './config/appUpdates'
import { graphQlClient } from './config/graphql'
import { Routes } from './routes'
import { Drawer } from './app/common/Drawer/Drawer'
import { ReduxProvider } from './config/redux'
import { createNotificationHandler } from './app/common/Notification/NotificationHandler'
import { notificationHandlers } from './notifications'
import { createLogger } from './app/common/logger'
import { ErrorGuard } from './app/common/ErrorView/ErrorGuard'

interface ApplicationState {
  loading?: boolean
}

interface AppProps {
  exp: {
    notification?: Notifications.Notification
  }
}

export default class App extends React.Component<AppProps> {
  state: ApplicationState = {
    loading: true,
  }

  logger = createLogger('App')

  navigator = createDrawerNavigator(Routes.get().topLevelRoutes, {
    initialRouteName: 'HomeScreen',
    contentComponent: Drawer,
    ...this.getInitialRoute(),
  })

  getInitialRoute() {
    if (this.props.exp.notification) {
      this.logger('Started with notification', this.props.exp.notification)
    }

    const handler = createNotificationHandler(
      notificationHandlers,
      this.props.exp.notification,
    )
    if (handler) {
      this.logger('Handling launch notification', this.props.exp.notification)
    }

    return (handler && handler.getInitialRoute()) || {}
  }

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
      <ErrorGuard>
        <ApolloProvider client={graphQlClient}>
          <ReduxProvider>
            <RegistrationContainer>
              <this.navigator />
            </RegistrationContainer>
          </ReduxProvider>
        </ApolloProvider>
      </ErrorGuard>
    )
  }
}
