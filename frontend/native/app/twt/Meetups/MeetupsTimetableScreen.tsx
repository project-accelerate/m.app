import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { MeetupsScreenQuery } from '../../../queries'
import { Routes } from '../../../routes'
import { createStateConnector } from '../../../state'
import { createFetchData } from '../../common/FetchData/FetchData'
import { Screen } from '../../common/Widgets/Widgets'
import { registration } from '../Registration/registrationState'
import TimetableScreenQueryDocument from '../Event/TimetableScreen.graphql'
import { EventListItemPressedEvent } from '../Event/EventListItem'
import { EventList } from '../Event/EventList'

const FetchEvents = createFetchData<MeetupsScreenQuery, {}>({
  query: TimetableScreenQueryDocument,
})

const Connect = createStateConnector({
  userId: registration.selectors.userId,
})

export class MeetupsTimetableScreen extends React.Component<
  NavigationScreenProps
> {
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
                  data={data.events}
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
