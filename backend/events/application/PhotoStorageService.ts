import { Service } from 'typedi'
import { S3Client } from 'backend/common/external/S3Client'
import { UUIDProvider } from 'backend/common/UUIDProvider'
import { Photo } from 'backend/events/domain/Photo'

@Service()
export class PhotoStorageService {
  constructor(private uuid: UUIDProvider, private s3: S3Client) {}

  async savePhoto(dataUri: string) {
    const id = this.uuid.generate()
    await this.s3.putObject(this.getS3Key(id), Buffer.from(dataUri))

    return id
  }

  getPhoto(id: string) {
    const photo = new Photo()
    photo.id = id

    return photo
  }

  getPhotoUrl(id: string) {
    return this.s3.objectUrl(this.getS3Key(id))
  }

  private getS3Key(id: string) {
    // See: https://devcenter.heroku.com/articles/bucketeer#public-files

    return `public/${id}`
  }
}
