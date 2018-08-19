import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import {
  EventDetailScreenQuery,
  EventDetailScreenQueryVariables,
} from '../../../queries'
import { createFetchData } from '../../common/FetchData/FetchData'
import { EventDetail, EventDetailSpeakerPressEvent } from './EventDetail'
import { Background } from '../../common/Layouts/Layouts'
import EventDetailScreenQueryDocument from './EventDetailScreen.graphql'
import { Screen } from '../../common/Widgets/Widgets'
import { registration } from '../Registration/registrationState'
import { createParametricStateConnector } from '../../../state'
import { calendar } from '../Calendar/calendarState'
import { Routes } from '../../../routes'

export interface EventDetailScreenParams {
  id: string
  title: string
}

const FetchEvent = createFetchData<
  EventDetailScreenQuery,
  EventDetailScreenQueryVariables
>({
  query: EventDetailScreenQueryDocument,
})

const Connect = createParametricStateConnector<{ eventId: string }>()({
  userId: registration.selectors.userId,
  isSaved: calendar.selectors.isSaved,
})

export class EventDetailScreen extends React.Component<
  NavigationScreenProps<EventDetailScreenParams>
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    title: navigation.getParam('title'),
    // headerTransparent: true
  })

  get eventId() {
    return this.props.navigation.getParam('id')
  }

  get queryVariables(): EventDetailScreenQueryVariables {
    return {
      id: this.eventId,
    }
  }

  handleSpeakerPressed = ({ speaker }: EventDetailSpeakerPressEvent) => {
    this.props.navigation.push(
      Routes.get().getRoutename('SpeakerDetailScreen'),
      {
        id: speaker.id,
        name: speaker.name,
      },
    )
  }

  render() {
    return (
      <Screen floatMenu>
        <Connect eventId={this.eventId}>
          {({ userId, isSaved, actions }) => (
            <Background solid>
              <FetchEvent variables={this.queryVariables}>
                {({ data, client }) => (
                  <EventDetail
                    event={FetchEvent.required(data.event)}
                    favourited={isSaved}
                    onSpeakerPress={this.handleSpeakerPressed}
                    onToggleFavourited={() => {
                      actions.calendar.toggleEventSaved({
                        event: FetchEvent.required(data.event),
                        alertMinutesBefore: 30,
                        userId,
                      })
                    }}
                  />
                )}
              </FetchEvent>
            </Background>
          )}
        </Connect>
      </Screen>
    )
  }
}
