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

export const stories = {
  SpeakerDetail: ()=> (
    <Background solid>
     <SpeakerDetail
      speaker={speakerDetail()}
      events= {times(4, createEvent)}
      onEventPress ={(x)=>console.log("Event Pressed: " + x.event.name)}
    />
  </Background>
  )
}

function speakerDetail() : SpeakerDetailFragment {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    bio: faker.lorem.lines(3),
    photo: null,
  }
}

function createEvent():EventListItemFragment
{
  return {
    id: faker.random.uuid(),
    name: faker.lorem.words(2),
    family: EventFamily.TWT_2018,
    venue: {
      id: faker.random.uuid(),
      name: faker.address.streetAddress(),
    },
    startTime: '2018-09-29T20:00:00.000Z',
    endTime: '2018-09-30T03:00:00.000Z',
    photo: require('../../../test/novaraLogo.png'),
    
  }
}
