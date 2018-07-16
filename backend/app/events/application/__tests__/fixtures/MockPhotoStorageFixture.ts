import {
  mock,
  instance,
  anything,
  when,
  verify,
  deepEqual,
} from 'ts-mockito/lib/ts-mockito'
import { FileUploadData } from 'apollo-upload-server'
import { PhotoStorageService } from '../../PhotoStorageService'

export class MockPhotoStorageFixture {
  mock = mock(PhotoStorageService)
  instance = instance(this.mock)

  givenThatThePhotoIsSavedWithId(id: string) {
    when(this.mock.savePhoto(anything())).thenResolve(id)
  }

  verifyPhotoSaved(photoUpload: FileUploadData) {
    verify(this.mock.savePhoto(deepEqual(photoUpload))).called()
  }
}
