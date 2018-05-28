import { EventRepository } from "../db/EventRepository";
import { EventProps } from "../domain/Event";
import { someString, someDate, someUuid, someGeoPoint, somePostcode, someInt } from "../../../test/testUtils";
import { OrganiserRepository } from "../db/OrganiserRepository";
import { VenueRepository } from "../db/VenueRepository";
import { VenueProps } from "../domain/Venue";
import { OrganiserProps } from "../domain/Organiser";
import { PostcodesIOPostcode } from "../external/PostcodesIOClient";

const eventRepository = new EventRepository()
const venueRepository = new VenueRepository()
const organiserRepository = new OrganiserRepository()

export function somePostcodesIoPostcode(props: Partial<PostcodesIOPostcode>): PostcodesIOPostcode {
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
    }
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
    ...props
  }
}

export function someVenueProps(props: Partial<VenueProps> = {}): VenueProps {
  return {
    name: someString(),
    postcode: somePostcode(),
    ...props
  }
}

export function someOrganiserProps(props: Partial<OrganiserProps> = {}): OrganiserProps {
  return {
    name: someString(),
    ...props
  }
}

export function givenThatAVenueExists(props: Partial<VenueProps> = {}) {
  return venueRepository.insert(someVenueProps(props))
}

export function givenThatAnOrganiserExists(props: Partial<OrganiserProps> = {}) {
  return organiserRepository.insert(someOrganiserProps(props))
}

export async function givenThatAnEventExists(props: Partial<EventProps> = {}) {
  const [organiser, venue] = await Promise.all([
    Promise.resolve(props.organiser || givenThatAnOrganiserExists()),
    Promise.resolve(props.venue || givenThatAVenueExists())
  ])

  return eventRepository.insert({
    ...someEventProps(props),
    organiser,
    venue
  })
}
