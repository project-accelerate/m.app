import { EventRepository } from '../external/EventRepository'
import { Event, CreateEventRequest } from '../domain/Event'
import {
  someString,
  someDate,
  someUuid,
  someGeoPoint,
  somePostcode,
  someInt,
} from '../../../common/test/testUtils'
import { OrganiserRepository } from '../external/OrganiserRepository'
import { VenueRepository } from '../external/VenueRepository'
import { Venue, CreateVenueRequest } from '../domain/Venue'
import { Organiser, CreateOrganiserRequest } from '../domain/Organiser'
import {
  PostcodesIOPostcode,
  PostcodesIOOutcode,
} from '../external/PostcodesIOClient'
import { Distance, DistanceUnit } from '../domain/Distance'
import { WithoutId } from '../../common/WithoutId'
import { Container } from 'typedi'
import { someImageUpload, someImage } from '../../test/testUtils'
import { Address, AddressInput } from '../domain/Address'

type EventProps = WithoutId<Event>
type OrganiserProps = WithoutId<Organiser>
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
    organiser: someUuid(),
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
    organiser: someUuid(),
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

export function someOrganiserProps(
  props: Partial<OrganiserProps> = {},
): OrganiserProps {
  return {
    name: someString(),
    ...props,
  }
}

export function fullOrganiserProps(
  props: Partial<OrganiserProps> = {},
): OrganiserProps {
  return {
    name: someString(),
    bio: someString(),
    photo: someString(),
    ...props,
  }
}

export function someCreateOrganiserRequest(): CreateOrganiserRequest
export function someCreateOrganiserRequest<
  Props extends Partial<CreateOrganiserRequest>
>(props: Props): Props & CreateOrganiserRequest
export function someCreateOrganiserRequest(
  props: Partial<CreateOrganiserRequest> = {},
): CreateOrganiserRequest {
  return {
    name: someString(),
    photoUpload: someImageUpload(),
    bio: someString(),
    ...props,
  }
}

export function someOrganiser(props: Partial<Organiser> = {}) {
  return Object.assign(
    new Organiser(),
    { id: someUuid() },
    someOrganiserProps(props),
  )
}

export function someDistance() {
  return new Distance(someInt(), DistanceUnit.m)
}

export function givenThatAVenueExists(props: Partial<VenueProps> = {}) {
  return Container.get(VenueRepository).insert(someVenueProps(props))
}

export function givenThatAnOrganiserExists(
  props: Partial<OrganiserProps> = {},
) {
  return Container.get(OrganiserRepository).insert(someOrganiserProps(props))
}

export async function givenThatAnEventExists(props: Partial<EventProps> = {}) {
  const [organiser, venue] = await Promise.all([
    Promise.resolve(
      props.organiser || givenThatAnOrganiserExists().then(o => o.id),
    ),
    Promise.resolve(props.venue || givenThatAVenueExists().then(v => v.id)),
  ])

  return Container.get(EventRepository).insert({
    ...someEventProps(props),
    organiser,
    venue,
  })
}
