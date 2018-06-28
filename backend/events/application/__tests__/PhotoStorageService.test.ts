import {
  mock,
  when,
  anything,
  instance,
  verify,
} from 'ts-mockito/lib/ts-mockito'
import { PhotoStorageService } from '../PhotoStorageService'
import { S3Client } from '../../../common/external/S3Client'
import { URL } from 'url'
import { UUIDProvider } from '../../../common/UUIDProvider'
import { someImageUpload } from '../../../test/testUtils'

describe(PhotoStorageService, () => {
  it('should upload photo returning id', async () => {
    const fixture = new Fixture()
    const photoUpload = await someImageUpload({
      mimetype: 'image/jpeg',
    })

    fixture.givenUUID('abc')

    const id = await fixture.service.savePhoto(photoUpload)

    expect(id).toBe('abc.jpeg')

    verify(fixture.s3.putObject(id, photoUpload.stream, photoUpload))
  })

  it('should provide public url for photos', () => {
    const fixture = new Fixture()

    fixture.givenBucketEndpoint('http://mybucket/')

    expect(fixture.service.getPhotoUrl('abc').toString()).toEqual(
      'http://mybucket/public/abc',
    )
  })
})

class Fixture {
  s3 = mock(S3Client)
  uuid = mock(UUIDProvider)

  service = new PhotoStorageService(instance(this.uuid), instance(this.s3))

  givenUUID(uuid: string) {
    when(this.uuid.generate()).thenReturn(uuid)
  }

  givenBucketEndpoint(prefix: string) {
    when(this.s3.objectUrl(anything())).thenCall(key => prefix + key)
  }

  givenThatTheUploadSucceeds() {
    when(this.s3.putObject(anything(), anything(), anything())).thenResolve(
      {} as any,
    )
  }
}

function objectUrl(key: string) {
  return new URL(`http://mys3.com/${key}`)
}
