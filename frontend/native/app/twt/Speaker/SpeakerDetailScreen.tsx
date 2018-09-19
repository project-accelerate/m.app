import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import {
  SpeakerDetailScreenQuery,
  SpeakerDetailScreenQueryVariables,
} from '../../../queries'
import { createFetchData } from '../../common/FetchData/FetchData'
import { SpeakerDetail, TwitterHandlePressedEvent } from './SpeakerDetail'
import { Background } from '../../common/Layouts/Layouts'
import SpeakerDetailScreenQueryDocument from './SpeakerDetailScreen.graphql'
import { EventListItemPressedEvent } from '../Event/EventListItem'
import { Routes } from '../../../routes'
import { Linking } from 'react-native'
import { ImageHeaderScreen } from '../../common/Screen/ImageHeaderScreen'
import { EventDetailScreen } from '../Event/EventDetailScreen'

export interface SpeakerDetailScreenParams {
  id: string
  name: string
  photo?: string
}

const FetchSpeaker = createFetchData<
  SpeakerDetailScreenQuery,
  SpeakerDetailScreenQueryVariables
>({
  query: SpeakerDetailScreenQueryDocument,
})

export class SpeakerDetailScreen extends React.Component<
  NavigationScreenProps<SpeakerDetailScreenParams>
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    headerTitle: navigation.getParam('name'),
  })

  get speakerID() {
    return this.props.navigation.getParam('id')
  }

  get title() {
    return this.props.navigation.getParam('name')
  }

  get queryVariables(): SpeakerDetailScreenQueryVariables {
    return {
      id: this.speakerID,
    }
  }

  handleEventPressed = ({ event }: EventListItemPressedEvent) => {
    Routes.get().push(this.props.navigation, EventDetailScreen, {
      id: event.id,
      title: event.name,
    })
  }

  handleTwitterPressed = ({ handle }: TwitterHandlePressedEvent) => {
    Linking.openURL('https://twitter.com/' + handle)
  }

  render() {
    return (
      <ImageHeaderScreen
        tintHeader
        image={this.props.navigation.getParam('photo')}
      >
        <Background solid>
          <FetchSpeaker variables={this.queryVariables}>
            {({ data }) => (
              <SpeakerDetail
                speaker={FetchSpeaker.required(data.person)}
                events={FetchSpeaker.required(data.eventsForSpeaker)}
                onEventPress={this.handleEventPressed}
                onTwitterPress={this.handleTwitterPressed}
              />
            )}
          </FetchSpeaker>
        </Background>
      </ImageHeaderScreen>
    )
  }
}
