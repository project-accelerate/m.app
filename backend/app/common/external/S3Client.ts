import { Service } from 'typedi'
import { S3 } from 'aws-sdk'
import log from 'winston'
import { PutObjectOutput, ManagedUpload } from 'aws-sdk/clients/s3'
import { ConfigService } from '../ConfigService'
import { URL } from 'url'

@Service()
export class S3Client {
  constructor(
    config: ConfigService,
    private bucketName = config.get('BUCKETEER_BUCKET_NAME'),
    private s3 = new S3({
      endpoint: config.getOptional('AWS_ENDPOINT'),
      accessKeyId: config.get('BUCKETEER_AWS_ACCESS_KEY_ID'),
      secretAccessKey: config.get('BUCKETEER_AWS_SECRET_ACCESS_KEY'),
      region: config.get('BUCKETEER_AWS_REGION'),
    }),
  ) {}

  objectUrl(key: string) {
    const url = new URL(this.s3.endpoint.href)
    url.hostname = `${this.bucketName}.${url.hostname}`
    url.pathname = `/${key}`

    return url
  }

  getObject(key: string) {
    return new Promise<Buffer>((resolve, reject) => {
      this.s3.getObject(
        {
          Key: key,
          Bucket: this.bucketName,
        },
        (err, data) => {
          if (err) {
            return reject(err)
          }

          if (!(data.Body instanceof Buffer)) {
            throw Error('Unexpected response type')
          }

          resolve(data.Body)
        },
      )
    })
  }

  putObject(
    object: string,
    body: S3.Body,
    opts: { mimetype: string; encoding: string },
  ) {
    log.silly('S3 Put', object, body, opts)

    const upload = new ManagedUpload({
      service: this.s3,
      params: {
        Key: object,
        Bucket: this.bucketName,
        Body: body,
        ContentType: opts.mimetype,
        ContentEncoding: opts.encoding,
      },
    })

    upload.send()
    return upload.promise()
  }
}
