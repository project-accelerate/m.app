import { Service } from 'typedi'
import { OrganiserRepository } from '../external/OrganiserRepository'
import { PhotoStorageService } from './PhotoStorageService'
import { CreateOrganiserRequest } from '../domain/Organiser'

@Service()
export class OrganiserAdminService {
  constructor(
    private readonly organiserRepository: OrganiserRepository,
    private readonly photoStorageService: PhotoStorageService,
  ) {}

  async addOrganiser({ photoUpload, ...props }: CreateOrganiserRequest) {
    const photoId = await PhotoStorageService.saveUploadedPhoto(
      this.photoStorageService,
      photoUpload,
    )

    return this.organiserRepository.insert({
      photo: photoId,
      ...props,
    })
  }
}
