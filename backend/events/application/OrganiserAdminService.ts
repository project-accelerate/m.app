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

  async addOrganiser({ photoUpload, ...props }: CreateOrganiserRequest) {
    const photoId =
      photoUpload &&
      (await this.photoStorageService.savePhoto(await photoUpload))

    return this.organiserRepository.insert({
      photo: photoId,
      ...props,
    })
  }
}
