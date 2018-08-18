import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { TimetableScreenQuery } from '../../../queries'
import { Routes } from '../../../routes'
import { createStateConnector } from '../../../state'
import { createFetchData } from '../../common/FetchData/FetchData'
import { Screen } from '../../common/Widgets/Widgets'
import { registration } from '../Registration/registrationState'
import TimetableScreenQueryDocument from './TimetableScreen.graphql'
import { EventListItemPressedEvent } from '../Event/EventListItem'
import { EventList } from '../Event/EventList'

const FetchEvents = createFetchData<TimetableScreenQuery, {}>({
  query: TimetableScreenQueryDocument,
})

const Connect = createStateConnector({
  userId: registration.selectors.userId,
})

export class MeetUpsTimetable extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Meetups',
    drawerLabel: 'Meetups',
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    this.props.navigation.push(Routes.get().getRoutename('EventDetailScreen'), {
      id: event.id,
      title: event.name,
    })
  }

  render() {
    return (
      <Screen>
        <Connect>
          {({ userId }) => (
            <FetchEvents variables={{ userId }}>
              {({ data }) => (
                <EventList
                  data={data.user.events}
                  onEventPress={this.handleEventPressed}
                />
              )}
            </FetchEvents>
          )}
        </Connect>
      </Screen>
    )
  }
}
