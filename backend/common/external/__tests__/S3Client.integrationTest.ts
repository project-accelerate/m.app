import { someBuffer } from '../../../../common/test/testUtils'
import { ConfigService } from '../../ConfigService'
import { S3Client } from '../S3Client'
import { someImageUpload, someImage } from '../../../test/testUtils'

describe('S3Client', () => {
  it('gets uploaded objects', async () => {
    const client = new S3Client(new ConfigService())
    const key = '123'
    const { stream, encoding, mimetype } = await someImageUpload()

    await client.putObject(key, stream, { encoding, mimetype })

    expect(await client.getObject(key)).toEqual(someImage)
  })

  it('returns configured s3 url for object key', async () => {
    const client = new S3Client(
      new ConfigService({
        ...process.env,
        AWS_ENDPOINT: `http://{service}.{region}.com:433`,
        BUCKETEER_BUCKET_NAME: 'my-bucket',
        BUCKETEER_AWS_REGION: 'eu-west-1',
      }),
    )

    expect(client.objectUrl('my-object').toString()).toBe(
      'http://my-bucket.s3.eu-west-1.com:433/my-object',
    )
  })
})
