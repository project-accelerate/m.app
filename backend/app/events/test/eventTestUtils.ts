import { EventRepository } from '../external/EventRepository'
import { Event, CreateEventRequest, EditEventRequest } from '../domain/Event'
import {
  someString,
  someDate,
  someUuid,
  someGeoPoint,
  somePostcode,
  someInt,
} from 'common/test/testUtils'
import { PersonRepository } from '../external/PersonRepository'
import { VenueRepository } from '../external/VenueRepository'
import { Venue, CreateVenueRequest } from '../domain/Venue'
import { Person, CreatePersonRequest } from '../domain/Person'
import {
  PostcodesIOPostcode,
  PostcodesIOOutcode,
} from '../external/PostcodesIOClient'
import { Distance, DistanceUnit } from '../domain/Distance'
import { WithoutId } from '../../common/WithoutId'
import { Container } from 'typedi'
import { someImageUpload } from '../../test/testUtils'
import { Address, AddressInput } from '../domain/Address'
import { EventFamily } from 'common/domain/EventFamily'

type EventProps = WithoutId<Event>
type PersonProps = WithoutId<Person>
type VenueProps = WithoutId<Venue>

export function somePostcodesIoPostcode(
  props: Partial<PostcodesIOPostcode>,
): PostcodesIOPostcode {
  return {
    postcode: someString(),
    quality: someInt(),
    eastings: someInt(),
    northings: someInt(),
    country: someString(),
    nhs_ha: someString(),
    longitude: someInt(),
    latitude: someInt(),
    european_electoral_region: someString(),
    primary_care_trust: someString(),
    region: someString(),
    lsoa: someString(),
    msoa: someString(),
    incode: someString(),
    outcode: someString(),
    parliamentary_constituency: someString(),
    admin_district: someString(),
    parish: someString(),
    admin_county: someString(),
    admin_ward: someString(),
    ccg: someString(),
    nuts: someString(),
    codes: {
      admin_district: someString(),
      admin_county: someString(),
      admin_ward: someString(),
      parish: someString(),
      parliamentary_constituency: someString(),
      ccg: someString(),
      nuts: someString(),
      ...props.codes,
    },
    ...props,
  }
}

export function someAddress(props: Partial<Address> = {}): Address {
  return {
    streetAddress: someString(),
    city: someString(),
    postcode: somePostcode(),
    location: someGeoPoint(),
    ...props,
  }
}

export function someAddressInput(
  props: Partial<AddressInput> = {},
): AddressInput {
  return {
    streetAddress: someString(),
    city: someString(),
    postcode: somePostcode(),
    ...props,
  }
}

export function somePostcodesIoOutcode(
  props: Partial<PostcodesIOOutcode> = {},
) {
  return {
    outcode: someString(),
    longitude: someInt(),
    latitude: someInt(),
    northings: someInt(),
    eastings: someInt(),
    admin_district: [someString()],
    parish: [someString()],
    admin_county: [someString()],
    admin_ward: [someString()],
    country: [someString()],
    ...props,
  }
}

export function someEventProps(props: Partial<EventProps> = {}): EventProps {
  return {
    name: someString(),
    introduction: someString(),
    detail: someString(),
    family: someEventFamily(),
    venue: someUuid(),
    startTime: someDate(),
    endTime: someDate(),
    location: someGeoPoint(),
    ...props,
  }
}


export function someCreateEventRequest(): CreateEventRequest
export function someCreateEventRequest<
  Props extends Partial<CreateEventRequest>
>(props: Props): Props & CreateEventRequest
export function someCreateEventRequest(
  props: Partial<CreateEventRequest> = {},
): CreateEventRequest {
  return {
    name: someString(),
    introduction: someString(),
    detail: someString(),
    family: someEventFamily(),
    venue: someUuid(),
    startTime: someDate(),
    endTime: someDate(),
    photoUpload: someImageUpload(),
    speakers: [],
    ...props,
  }
}


export function someEvent(props: Partial<Event> = {}) {
  return Object.assign(new Event(), { id: someUuid() }, someEventProps(props))
}

export function someVenueProps(props: Partial<VenueProps> = {}): VenueProps {
  return {
    name: someString(),
    description: someString(),
    photo: someString(),
    ...someAddress(),
    ...props,
  }
}

export function someCreateVenueRequest(): CreateVenueRequest
export function someCreateVenueRequest<
  Props extends Partial<CreateVenueRequest>
>(props: Props): Props & CreateVenueRequest
export function someCreateVenueRequest(
  props: Partial<CreateVenueRequest> = {},
): CreateVenueRequest {
  return {
    name: someString(),
    address: someAddressInput(),
    description: someString(),
    photoUpload: someImageUpload(),
    ...props,
  }
}

export function someVenue(props: Partial<Venue> = {}) {
  return Object.assign(new Venue(), { id: someUuid() }, someVenueProps(props))
}

export function somePersonProps(props: Partial<PersonProps> = {}): PersonProps {
  return {
    name: someString(),
    ...props,
  }
}

export function fullPersonProps(props: Partial<PersonProps> = {}): PersonProps {
  return {
    name: someString(),
    bio: someString(),
    photo: someString(),
    ...props,
  }
}

export function someCreatePersonRequest(): CreatePersonRequest
export function someCreatePersonRequest<
  Props extends Partial<CreatePersonRequest>
>(props: Props): Props & CreatePersonRequest
export function someCreatePersonRequest(
  props: Partial<CreatePersonRequest> = {},
): CreatePersonRequest {
  return {
    name: someString(),
    photoUpload: someImageUpload(),
    bio: someString(),
    ...props,
  }
}

export function somePerson(props: Partial<Person> = {}) {
  return Object.assign(new Person(), { id: someUuid() }, somePersonProps(props))
}

export function someEventFamily() {
  return EventFamily.TWT
}

export function someDistance() {
  return new Distance(someInt(), DistanceUnit.m)
}

export function givenThatAVenueExists(props: Partial<VenueProps> = {}) {
  return Container.get(VenueRepository).insert(someVenueProps(props))
}

export function givenThatAPersonExists(props: Partial<PersonProps> = {}) {
  return Container.get(PersonRepository).insert(somePersonProps(props))
}

export async function givenThatAnEventAndSpeakerExists(personProps: Partial<PersonProps> = {},eventProps: Partial<EventProps> = {}) {
  var person = await givenThatAPersonExists(personProps)
  var event = await givenThatAnEventExists(eventProps)

  return Container.get(EventRepository).speakers.add(event.id,[person.id])

}

export async function givenThatAnEventExists(props: Partial<EventProps> = {}) {
  const venue = props.venue || (await givenThatAVenueExists().then(v => v.id))

  return Container.get(EventRepository).insert({
    ...someEventProps(props),
    venue,
  })
}
