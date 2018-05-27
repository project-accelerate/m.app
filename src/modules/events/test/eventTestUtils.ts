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
  }
}

export function givenThatAVenueExists(venueProps = someVenueProps()) {
  return venueRepository.insert(venueProps)
}

export function givenThatAnOrganiserExists(organiserProps = someOrganiserProps()) {
  return organiserRepository.insert(organiserProps)
}

export async function givenThatAnEventExists(eventProps: Partial<EventProps> = {}) {
  const [organiser, venue] = await Promise.all([
    givenThatAnOrganiserExists(),
    givenThatAVenueExists()
  ])

  return eventRepository.insert({
    ...someEventProps(eventProps),
    organiser,
    venue
  })
}
