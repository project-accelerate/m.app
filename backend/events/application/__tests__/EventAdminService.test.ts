import { mock, when, anything, verify, instance, deepEqual } from "ts-mockito";
import { Point } from "geojson";
import { PostcodesIOClient } from "../../external/PostcodesIOClient";
import { EventRepository } from "../../external/EventRepository";
import { OrganiserAdminService } from "../OrganiserAdminService";
import { VenueAdminService } from "../VenueAdminService";
import { EventAdminService } from "../EventAdminService";
import { somePostcodesIoPostcode } from "../../test/eventTestUtils";
import { somePostcode, someGeoPoint, someDate, someString, someUuid } from "common/test/testUtils";

describe('EventAdminService', () => {
  it('creates event, venue and organiser', async () => {
    const fixture = new Fixture()
    const postcode = somePostcode()
    const location = someGeoPoint()
    const startTime = new Date('2010-01-01')
    const endTime = new Date('2010-01-02')

    fixture.givenCreatedEventId('event-id')
    fixture.givenCreatedOrganiserId('organiser-id')
    fixture.givenCreatedVenueId('venue-id')
    fixture.givenLocationForPostcode(postcode, location)

    const eventId = await fixture.eventAdmin.submitEvent({
      postcode,
      endTime,
      startTime,
      introduction: 'this is great',
      organiserName: 'Organiser',
      venueName: 'Venue',
      name: 'Event'
    })

    expect(eventId).toEqual('event-id')

    verify(
      fixture.organiserAdmin.addOrganiser(deepEqual({ name: 'Organiser' }))
    ).called()

    verify(
      fixture.venueAdmin.addVenue(deepEqual({ name: 'Venue', postcode }))
    ).called()

    verify(
      fixture.eventRepository.insert(
        deepEqual({
          startTime,
          endTime,
          organiser: 'organiser-id',
          venue: 'venue-id',
          introduction: 'this is great',
          name: 'Event',
          location
        })
      )
    ).called()
  })
})

class Fixture {
  postcodesClient = mock(PostcodesIOClient)
  eventRepository = mock(EventRepository)
  organiserAdmin = mock(OrganiserAdminService)
  venueAdmin = mock(VenueAdminService)

  eventAdmin = new EventAdminService(
    instance(this.postcodesClient),
    instance(this.eventRepository),
    instance(this.organiserAdmin),
    instance(this.venueAdmin)
  )

  givenLocationForPostcode(postcode: string, location: Point) {
    const [longitude, latitude] = location.coordinates

    when(this.postcodesClient.getPostcode(postcode))
      .thenResolve(somePostcodesIoPostcode({ postcode, latitude, longitude }))
  }

  givenCreatedEventId(id: string) {
    when(this.eventRepository.insert(anything()))
      .thenResolve(id)
  }

  givenCreatedVenueId(id: string) {
    when(this.venueAdmin.addVenue(anything()))
      .thenResolve(id)
  }

  givenCreatedOrganiserId(id: string) {
    when(this.organiserAdmin.addOrganiser(anything()))
      .thenResolve(id)
  }
}
