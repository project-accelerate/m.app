import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { TimetableScreenQuery } from '../../../queries'
import { EventList } from './EventList'
import { createFetchData } from '../../common/FetchData/FetchData'
import { EventListItemPressedEvent } from './EventListItem'
import { getRoutename } from '../../../routes'
import TimetableScreenQueryDocument from './TimetableScreen.graphql'
import { Screen } from '../../common/Widgets/Widgets'
import * as registration from '../Registration/registration'
import { createStateConnector } from '../../../state'

const FetchEvents = createFetchData<TimetableScreenQuery, {}>({
  query: TimetableScreenQueryDocument,
})

const Connect = createStateConnector({
  userId: registration.selectors.userId,
})

export class TimetableScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Programme',
    drawerLabel: 'Programme',
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    this.props.navigation.push(getRoutename('EventDetailScreen'), {
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
