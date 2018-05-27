import { EventRepository } from "../db/EventRepository";
import { EventProps } from "../domain/Event";
import { someString, someDate, someUuid, someGeoPoint, somePostcode } from "../../../test/testUtils";
import { OrganiserRepository } from "../db/OrganiserRepository";
import { VenueRepository } from "../db/VenueRepository";
import { VenueProps } from "../domain/Venue";
import { OrganiserProps } from "../domain/Organiser";

const eventRepository = new EventRepository()
const venueRepository = new VenueRepository()
const organiserRepository = new OrganiserRepository()

export function someEventProps(props: Partial<EventProps> = {}): EventProps {
  return {
    name: someString(),
    introduction: someString(),
    organiser: someUuid(),
    venue: someUuid(),
    startTime: someDate(),
    endTime: someDate(),
    ...props
  }
}

export function someVenueProps(props: Partial<VenueProps> = {}): VenueProps {
  return {
    name: someString(),
    postcode: somePostcode(),
    location: someGeoPoint(),
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
