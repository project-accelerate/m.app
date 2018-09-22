import { Service } from 'typedi'
import { VenueRepository } from '../external/VenueRepository'
import { CreateVenueRequest } from '../domain/Venue'
import { PhotoStorageService } from './PhotoStorageService'
import { PostcodesIOClient } from '../external/PostcodesIOClient'

@Service()
export class VenueAdminService {
  constructor(
    private readonly venueRepository: VenueRepository,
    private readonly photoStorageService: PhotoStorageService,
    private readonly postcodeClient: PostcodesIOClient,
  ) {}

  async addVenue({ photoUpload, address, ...props }: CreateVenueRequest) {
    if (props.importRef) {
      const existing = await this.venueRepository.findOne({
        importRef: props.importRef,
      })
      if (existing) {
        return existing
      }
    }

    const [photoId, location] = await Promise.all([
      PhotoStorageService.saveUploadedPhoto(
        this.photoStorageService,
        photoUpload,
      ),
      this.postcodeClient.getPostcode(address.postcode),
    ])

    return this.venueRepository.insert({
      photo: photoId,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      ...address,
      ...props,
    })
  }
}
