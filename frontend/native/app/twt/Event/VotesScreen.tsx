import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { VotesScreenQuery } from '../../../queries'
import { Routes } from '../../../routes'
import { createStateConnector } from '../../../state'
import { createFetchData } from '../../common/FetchData/FetchData'
import { registration } from '../Registration/registrationState'
import VotesScreenQueryDocument from './VotesScreen.graphql'
import { EventListItemPressedEvent } from './EventListItem'
import { EventList } from './EventList'
import { BasicScreen } from '../../common/Screen/BasicScreen'

const FetchEvents = createFetchData<VotesScreenQuery, {}>({
  query: VotesScreenQueryDocument,
})

const Connect = createStateConnector(() => ({
  userId: registration.selectors.userId,
}))

export class VotesScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Programme',
    drawerLabel: 'Programme',
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    this.props.navigation.push(Routes.get().getRoutename('EventDetailScreen'), {
      id: event.id,
      title: event.name,
    })
  }

  render() {
    return (
      <BasicScreen>
        <Connect>
          {({ userId }) => (
            <FetchEvents variables={{ userId }}>
              {({ data }) => (
                <EventList
                  data={data.user.votes}
                  onEventPress={this.handleEventPressed}
                />
              )}
            </FetchEvents>
          )}
        </Connect>
      </BasicScreen>
    )
  }
}
