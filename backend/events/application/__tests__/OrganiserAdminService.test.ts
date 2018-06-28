import { OrganiserAdminService } from '../OrganiserAdminService'
import { mock, when, anything, verify } from 'ts-mockito/lib/ts-mockito'
import { OrganiserRepository } from '../../external/OrganiserRepository'
import { PhotoStorageService } from '../PhotoStorageService'
import { someImageUpload } from '../../../test/testUtils'
import { MockPhotoStorageFixture } from './fixtures/MockPhotoStorageFixture'
import { MockCrudRepositoryFixture } from './fixtures/MockCrudRepositoryFixture'

describe(OrganiserAdminService, () => {
  it('saves all data when new organiser is created', async () => {
    const fixture = new Fixture()
    const photoUpload = someImageUpload()

    fixture.photoStorage.givenThatThePhotoIsSavedWithId('photo1')
    fixture.organiserRepository.givenIdReturnedFromInsert('organiser1')

    const returnedId = await fixture.service.addOrganiser({
      name: 'me',
      photoUpload,
      bio: 'my bio',
    })

    fixture.organiserRepository.verifyInserted({
      name: 'me',
      photo: 'photo1',
      bio: 'my bio',
    })

    fixture.photoStorage.verifyPhotoSaved(await photoUpload)
  })
})

class Fixture {
  organiserRepository = new MockCrudRepositoryFixture(OrganiserRepository)
  photoStorage = new MockPhotoStorageFixture()

  service = new OrganiserAdminService(
    this.organiserRepository.instance,
    this.photoStorage.instance,
  )
}
