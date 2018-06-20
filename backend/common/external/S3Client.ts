import { Service } from 'typedi'
import { S3 } from 'aws-sdk'
import { PutObjectOutput } from 'aws-sdk/clients/s3'
import { getEnv, getDevelopmentEnv } from 'backend/common/env'

@Service()
export class S3Client {
  private bucketName = getEnv('BUCKETEER_BUCKET_NAME')
  private s3 = new S3({
    endpoint: getDevelopmentEnv('TEST_AWS_S3_ENDPOINT'),
    accessKeyId: getEnv('BUCKETEER_AWS_ACCESS_KEY_ID'),
    secretAccessKey: getEnv('BUCKETEER_AWS_SECRET_ACCESS_KEY'),
    region: getEnv('BUCKETEER_AWS_REGION'),
  })

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

  putObject(object: string, buffer: Buffer) {
    return new Promise<PutObjectOutput>((resolve, reject) => {
      this.s3.putObject(
        {
          Key: object,
          Bucket: this.bucketName,
          Body: buffer,
        },
        (err, data) => {
          if (err) {
            return reject(err)
          }

          resolve(data)
        },
      )
    })
  }
}
