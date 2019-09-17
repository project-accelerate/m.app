import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { TimetableScreenQuery } from '../../../queries'
import { Routes } from '../../../routes'
import { createStateConnector } from '../../../state'
import { createFetchData } from '../../common/FetchData/FetchData'
import * as registration from '../Registration/registrationState'
import TimetableScreenQueryDocument from './TimetableScreen.graphql'
import { EventListItemPressedEvent } from './EventListItem'
import { EventList } from './EventList'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import { EventDetailScreen } from './EventDetailScreen'

const FetchEvents = createFetchData<TimetableScreenQuery, {}>({
  query: TimetableScreenQueryDocument,
})

const Connect = createStateConnector(() => ({
  userId: registration.selectors.userId,
}))

export class TimetableScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Programme',
    drawerLabel: 'Programme',
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    Routes.get().push(this.props.navigation, EventDetailScreen, {
      id: event.id,
      title: event.name,
      image: (event.photo && event.photo.sourceUrl) || undefined,
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
                  data={data.user.events}
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
