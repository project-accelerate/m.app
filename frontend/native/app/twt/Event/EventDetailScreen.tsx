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
import { registration } from '../Registration/registrationState'
import { createParametricStateConnector } from '../../../state'
import { calendar } from '../Calendar/calendarState'
import { Routes } from '../../../routes'
import { ImageHeaderScreen } from '../../common/Screen/ImageHeaderScreen'
import { TimeProvider } from '../../common/Time/TimeProvider'

export interface EventDetailScreenParams {
  id: string
  title: string
  image: string
}

const FetchEvent = createFetchData<
  EventDetailScreenQuery,
  EventDetailScreenQueryVariables
>({
  query: EventDetailScreenQueryDocument,
})

const Connect = createParametricStateConnector<{ eventId: string }>()(() => ({
  userId: registration.selectors.userId,
  isSaved: calendar.selectors.isSaved,
}))

export class EventDetailScreen extends React.Component<
  NavigationScreenProps<EventDetailScreenParams>
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    headerTitle: navigation.getParam('title'),
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
    console.log(speaker)
    this.props.navigation.push(
      Routes.get().getRoutename('SpeakerDetailScreen'),
      {
        id: speaker.id,
        name: speaker.name,
        photo: speaker.photo && speaker.photo.sourceUrl,
      },
    )
  }

  render() {
    return (
      <ImageHeaderScreen
        tintHeader
        image={this.props.navigation.getParam('image')}
      >
        <Connect eventId={this.eventId}>
          {({ userId, isSaved, actions }) => (
            <Background solid>
              <FetchEvent variables={this.queryVariables}>
                {({ data }) => (
                  <TimeProvider granularity="minutes">
                    {time => (
                      <EventDetail
                        event={FetchEvent.required(data.event)}
                        favourited={isSaved}
                        canSave={calendar.canSave(
                          FetchEvent.required(data.event),
                          time,
                        )}
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
                  </TimeProvider>
                )}
              </FetchEvent>
            </Background>
          )}
        </Connect>
      </ImageHeaderScreen>
    )
  }
}
