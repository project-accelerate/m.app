import { OrganiserAdminService } from 'backend/events/application/OrganiserAdminService'
import { mock, when, anything, verify } from 'ts-mockito'
import { OrganiserRepository } from 'backend/events/external/OrganiserRepository'
import { PhotoStorageService } from 'backend/events/application/PhotoStorageService'

describe(OrganiserAdminService, () => {
  it('saves all data when new organiser is created', async () => {
    const fixture = new Fixture()

    fixture.givenThatThePhotoIsSavedWithId('photo1')
    fixture.givenThatTheOrganiserInsertsReturningId('organiser1')

    const returnedId = await fixture.service.addOrganiser({
      name: 'me',
      photoData: 'data:123',
      bio: 'my bio',
    })

    verify(
      fixture.organiserRepository.insert({
        name: 'me',
        photo: 'photo1',
        bio: 'my bio',
      }),
    )

    verify(fixture.photoStorageService.savePhoto('data:123'))
  })
})

class Fixture {
  organiserRepository = mock(OrganiserRepository)
  photoStorageService = mock(PhotoStorageService)

  service = new OrganiserAdminService(
    this.organiserRepository,
    this.photoStorageService,
  )

  givenThatThePhotoIsSavedWithId(id: string) {
    when(this.photoStorageService.savePhoto(anything())).thenResolve(id)
  }

  givenThatTheOrganiserInsertsReturningId(id: string) {
    when(this.organiserRepository.insert(anything())).thenResolve(id)
  }
}
