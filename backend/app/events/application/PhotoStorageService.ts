import { Service } from 'typedi'
import { extension } from 'mime-types'
import { Readable } from 'stream'
import { S3Client } from '../../common/external/S3Client'
import { UUIDProvider } from '../../common/UUIDProvider'
import { Photo } from '../domain/Photo'
import { FileUpload } from 'apollo-upload-server'
import sharp from 'sharp'

interface SavePhotoProps {
  stream: Readable
  mimetype: string
  encoding: string
  isPortrait?: boolean
}

@Service()
export class PhotoStorageService {
  constructor(private uuid: UUIDProvider, private s3: S3Client) {}

  static async saveUploadedPhoto(
    service: PhotoStorageService,
    photoUpload?: FileUpload,
    opts?: { isPortrait?: boolean },
  ) {
    if (photoUpload) {
      const photo: SavePhotoProps = await photoUpload
      return service.savePhoto({ ...photo, ...opts })
    }

    return undefined
  }

  async savePhoto(photo: SavePhotoProps) {
    const id = this.generateId(photo.mimetype)
    await this.s3.putObject(
      this.getS3Key(id),
      photo.stream.pipe(
        this.resize({
          width: 1024,
          height: 1024,
          isPortrait: photo.isPortrait,
        }),
      ),
      photo,
    )

    return id
  }

  getPhoto(id: string): Photo
  getPhoto(id: string | undefined): Photo | undefined
  getPhoto(id?: string) {
    if (!id) {
      return undefined
    }

    const photo = new Photo()
    photo.id = id

    return photo
  }

  getPhotoUrl(id: string) {
    return this.s3.objectUrl(this.getS3Key(id))
  }

  private resize(opts: {
    width: number
    height: number
    isPortrait?: boolean
  }) {
    return sharp()
      .resize(opts.width, opts.height)
      .min()
      .crop(opts.isPortrait ? sharp.strategy.attention : sharp.strategy.entropy)
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
