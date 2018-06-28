import { Query, Resolver, Arg, Root, FieldResolver } from 'type-graphql'
import { VenueRepository } from '../external/VenueRepository'
import { Venue } from '../domain/Venue'
import { PhotoStorageService } from '../application/PhotoStorageService'
import { Photo } from '../domain/Photo'
import { Address } from '../domain/Address'

@Resolver(Venue)
export class VenueResolver {
  constructor(
    private venueRepository: VenueRepository,
    private photoStorageService: PhotoStorageService,
  ) {}

  @Query(() => Venue, {
    nullable: true,
    description: 'Get a venue by id',
  })
  venue(@Arg('id') id: string) {
    return this.venueRepository.findOne(id)
  }

  @FieldResolver(() => Photo)
  photo(@Root() venue: Venue) {
    return this.photoStorageService.getPhoto(venue.photo)
  }

  @FieldResolver(() => Address)
  address(@Root() venue: Venue) {
    return Address.create(venue)
  }
}
