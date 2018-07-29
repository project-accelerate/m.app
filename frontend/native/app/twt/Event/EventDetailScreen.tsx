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
    // headerTransparent: true
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
      <Screen floatMenu>
        <Background solid>
          <FetchEvent variables={this.queryVariables}>
            {({ data }) => (
              <EventDetail
                event={FetchEvent.required(data.event)}
                onSpeakerPress={this.handleSpeakerPressed}
              />
            )}
          </FetchEvent>
        </Background>
      </Screen>
    )
  }
}
