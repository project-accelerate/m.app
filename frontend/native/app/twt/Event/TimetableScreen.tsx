import React from 'react'
import { ListView } from 'react-native'
import {
  NavigationScreenOptions,
  NavigationScene,
  NavigationScreenProps,
} from 'react-navigation'
import { Background } from '../../common/Layouts/Layouts'
import { TimetableScreenQuery } from '../../../queries'
import { EventList } from './EventList'
import { createFetchData } from '../../common/FetchData/FetchData'
import { EventListItemPressedEvent } from './EventListItem'
import { getRoutename } from '../../../routes'
import TimetableScreenQueryDocument from './TimetableScreen.graphql'

const FetchEvents = createFetchData<TimetableScreenQuery, {}>({
  query: TimetableScreenQueryDocument,
})

export class TimetableScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Timetable',
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    this.props.navigation.push(getRoutename('EventDetail'), {
      id: event.id,
      title: event.name,
    })
  }

  render() {
    return (
      <Background>
        <FetchEvents variables={{}}>
          {({ data }) => (
            <EventList
              data={data.events}
              onEventPress={this.handleEventPressed}
            />
          )}
        </FetchEvents>
      </Background>
    )
  }
}
