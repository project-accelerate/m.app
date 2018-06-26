import { Service } from 'typedi'
import { extension } from 'mime-types'
import { Readable } from 'stream'
import { S3Client } from 'backend/common/external/S3Client'
import { UUIDProvider } from 'backend/common/UUIDProvider'
import { Photo } from 'backend/events/domain/Photo'

interface SavePhotoProps {
  stream: Readable
  mimetype: string
  encoding: string
}

@Service()
export class PhotoStorageService {
  constructor(private uuid: UUIDProvider, private s3: S3Client) {}

  async savePhoto(photo: SavePhotoProps) {
    const id = this.generateId(photo.mimetype)
    await this.s3.putObject(this.getS3Key(id), photo.stream, photo)

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

  private generateId(mimeType: string) {
    // Currently filename == id.
    // Which isn't ideal, but YAGNI
    // We hang on to file extension for mime type just in case
    return `${this.uuid.generate()}.${extension(mimeType)}`
  }
}
