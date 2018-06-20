import { S3Client } from '../S3Client'
import { someBuffer } from 'common/test/testUtils'

describe('S3Client', () => {
  it('gets uploaded objects', async () => {
    const client = new S3Client()
    const key = '123'
    const data = someBuffer()

    await client.putObject(key, data)

    expect(await client.getObject(key)).toEqual(data)
  })
})
