import { EventRepository } from '../external/EventRepository'
import { Event } from '../domain/Event'
import {
  someString,
  someDate,
  someUuid,
  someGeoPoint,
  somePostcode,
  someInt,
} from 'common/test/testUtils'
import { OrganiserRepository } from '../external/OrganiserRepository'
import { VenueRepository } from '../external/VenueRepository'
import { Venue } from '../domain/Venue'
import { Organiser } from '../domain/Organiser'
import {
  PostcodesIOPostcode,
  PostcodesIOOutcode,
} from '../external/PostcodesIOClient'
import { Distance, DistanceUnit } from '../domain/Distance'
import { WithoutId } from 'backend/common/WithoutId'
import { Container } from 'typedi'

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
    organiser: someUuid(),
    venue: someUuid(),
    startTime: someDate(),
    endTime: someDate(),
    location: someGeoPoint(),
    ...props,
  }
}

export function someEvent(props: Partial<EventProps> = {}) {
  return Object.assign(new Event(), { id: someUuid() }, someEventProps(props))
}

export function someVenueProps(props: Partial<VenueProps> = {}): VenueProps {
  return {
    name: someString(),
    postcode: somePostcode(),
    ...props,
  }
}

export function someVenue(props: Partial<VenueProps> = {}) {
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

export function someOrganiser(props: Partial<OrganiserProps> = {}) {
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
    Promise.resolve(props.organiser || givenThatAnOrganiserExists()),
    Promise.resolve(props.venue || givenThatAVenueExists()),
  ])

  return Container.get(EventRepository).insert({
    ...someEventProps(props),
    organiser,
    venue,
  })
}
