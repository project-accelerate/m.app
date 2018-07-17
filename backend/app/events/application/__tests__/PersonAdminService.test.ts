import { MockCrudRepositoryFixture } from 'backend/app/common/test/MockCrudRepositoryFixture'
import { PersonAdminService } from '../PersonAdminService'
import { PersonRepository } from '../../external/PersonRepository'
import { someImageUpload } from '../../../test/testUtils'
import { MockPhotoStorageFixture } from '../../test/MockPhotoStorageFixture'

describe(PersonAdminService, () => {
  it('saves all data when new person is created', async () => {
    const fixture = new Fixture()
    const photoUpload = someImageUpload()

    fixture.photoStorage.givenThatThePhotoIsSavedWithId('photo1')
    fixture.personRepository.givenIdReturnedFromInsert('person1')

    const returnedId = await fixture.service.addPerson({
      name: 'me',
      photoUpload,
      bio: 'my bio',
    })

    fixture.personRepository.verifyInserted({
      name: 'me',
      photo: 'photo1',
      bio: 'my bio',
    })

    fixture.photoStorage.verifyPhotoSaved(await photoUpload)
  })
})

class Fixture {
  personRepository = new MockCrudRepositoryFixture(PersonRepository)
  photoStorage = new MockPhotoStorageFixture()

  service = new PersonAdminService(
    this.personRepository.instance,
    this.photoStorage.instance,
  )
}
