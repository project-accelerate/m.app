import { Service } from 'typedi'
import { OrganiserRepository } from '../external/OrganiserRepository'
import { PhotoStorageService } from 'backend/events/application/PhotoStorageService'
import { CreateOrganiserRequest } from 'backend/events/domain/Organiser'

@Service()
export class OrganiserAdminService {
  constructor(
    private readonly organiserRepository: OrganiserRepository,
    private readonly photoStorageService: PhotoStorageService,
  ) {}

  async addOrganiser({ photoData, ...props }: CreateOrganiserRequest) {
    const photoId =
      photoData && (await this.photoStorageService.savePhoto(photoData))

    return this.organiserRepository.insert({
      photo: photoId,
      ...props,
    })
  }
}
