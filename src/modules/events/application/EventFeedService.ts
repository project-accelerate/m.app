import Postcode = require('postcode')
import { addMonths } from "date-fns";
import { Point } from 'geojson';
import { DateProvider } from "../../../common/DateProvider";
import { EventRepository } from "../external/EventRepository";
import { PostcodesIOClient } from "../external/PostcodesIOClient";
import { DistanceUnit, Distance } from "../domain/Distance";

interface EventFeedQuery {
  radiusInMiles: number
  postcode: string
  months: number
}

export class EventFeedService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly postcodeClient: PostcodesIOClient,
    private readonly dateProvider: DateProvider
  ) { }

  async eventFeed(query: EventFeedQuery) {
    return this.eventRepository.findByTimeAndLocation({
      distance: new Distance(query.radiusInMiles, DistanceUnit.miles),
      fromTime: this.dateProvider.now(),
      toTime: addMonths(this.dateProvider.now(), query.months),
      location: await this.locationFromPostcodeSegment(query.postcode)
    })
  }

  private async locationFromPostcodeSegment(postcodeSegment: string): Promise<Point> {
    const { longitude, latitude } = await this.resolvePostcode(postcodeSegment)

    return {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  }

  private resolvePostcode(postcodeSegment: string) {
    if (new Postcode(postcodeSegment).valid()) {
      return this.postcodeClient.getPostcode(postcodeSegment)
    }

    if (Postcode.validOutcode(postcodeSegment)) {
      return this.postcodeClient.getOutcode(postcodeSegment)
    }

    throw Error(`Invalid postcode: ${postcodeSegment}`)
  }
}