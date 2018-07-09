import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenOption,
  NavigationScene,
  NavigationScreenProp,
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

export class EventDetailScreen extends React.Component<
  NavigationScreenProps<EventDetailScreenParams>
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    title: navigation.getParam('title'),
  })

  get queryVariables(): EventDetailScreenQueryVariables {
    return {
      id: this.props.navigation.getParam('id'),
    }
  }

  handleSpeakerPressed = ({ speaker }: EventDetailSpeakerPressEvent) => {
    console.log('press', speaker)
  }

  render() {
    return (
      <Background>
        <FetchEvent variables={this.queryVariables}>
          {({ data }) => (
            <EventDetail
              event={FetchEvent.required(data.event)}
              onSpeakerPress={this.handleSpeakerPressed}
            />
          )}
        </FetchEvent>
      </Background>
    )
  }
}
