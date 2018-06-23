import { mock, when, anything, instance, verify } from 'ts-mockito'
import { PhotoStorageService } from 'backend/events/application/PhotoStorageService'
import { S3Client } from 'backend/common/external/S3Client'
import { URL } from 'url'
import { UUIDProvider } from 'backend/common/UUIDProvider'

describe(PhotoStorageService, () => {
  it('should upload photo returning id', async () => {
    const fixture = new Fixture()
    const photoData = 'data:123'

    fixture.givenUUID('abc')

    const id = await fixture.service.savePhoto(photoData)

    expect(id).toBe('abc')

    verify(fixture.s3.putObject(id, Buffer.from(photoData)))
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
    when(this.s3.putObject(anything(), anything())).thenResolve({} as any)
  }
}

function objectUrl(key: string) {
  return new URL(`http://mys3.com/${key}`)
}
