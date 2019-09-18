import React from 'react'
import faker from 'faker'
import { times } from 'lodash'
import {
  EventFamily,
  SpeakerDetailFragment,
  EventListItemFragment,
} from '../../../queries'
import { Background } from '../../common/Layouts/Layouts'
import { SpeakerDetail } from './SpeakerDetail'
import { ImageHeaderScreen } from '../../common/Screen/ImageHeaderScreen'

export const stories = {
  SpeakerDetail: () => (
    <ImageHeaderScreen image={require('../Home/TWTa_hdr.jpg')} tintHeader>
      <Background solid>
        <SpeakerDetail
          speaker={speakerDetail()}
          events={times(4, createEvent)}
          onEventPress={x => console.log('Event Pressed: ' + x.event.name)}
          onTwitterPress={x =>
            console.log('Twitter Handle Pressed: ' + x.handle)
          }
        />
      </Background>
    </ImageHeaderScreen>
  ),
  'SpeakerDetail (no twitter)': () => (
    <ImageHeaderScreen image={require('../Home/TWTa_hdr.jpg')} tintHeader>
      <Background solid>
        <SpeakerDetail
          speaker={{ ...speakerDetail(), twitterHandle: null }}
          events={times(4, createEvent)}
          onEventPress={x => console.log('Event Pressed: ' + x.event.name)}
          onTwitterPress={x =>
            console.log('Twitter Handle Pressed: ' + x.handle)
          }
        />
      </Background>
    </ImageHeaderScreen>
  ),
}

function speakerDetail(): SpeakerDetailFragment {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    bio: faker.lorem.lines(3),
    photo: null,
    twitterHandle: '@mrtestguy',
  }
}

function createEvent(): EventListItemFragment {
  return {
    id: faker.random.uuid(),
    name: faker.lorem.words(2),
    family: EventFamily.TWT,
    venue: {
      id: faker.random.uuid(),
      name: faker.address.streetAddress(),
    },
    startTime: '2018-09-29T20:00:00.000Z',
    endTime: '2018-09-30T03:00:00.000Z',
    photo: require('../../../test/novaraLogo.png'),
  }
}
