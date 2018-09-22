import { Service } from 'typedi'
import { PersonRepository } from '../external/PersonRepository'
import { PhotoStorageService } from './PhotoStorageService'
import { CreatePersonRequest } from '../domain/Person'

@Service()
export class PersonAdminService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly photoStorageService: PhotoStorageService,
  ) {}

  async addPerson({ photoUpload, ...props }: CreatePersonRequest) {
    if (props.importRef) {
      const existing = await this.personRepository.findOne({
        importRef: props.importRef,
      })
      if (existing) {
        return existing
      }
    }

    const photoId = await PhotoStorageService.saveUploadedPhoto(
      this.photoStorageService,
      photoUpload,
    )

    return this.personRepository.insert({
      photo: photoId,
      ...props,
    })
  }
}
