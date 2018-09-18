import { mock, instance, when, anything, verify, deepEqual } from 'ts-mockito'
import { UserAdminService } from 'backend/app/user/application/UserAdminService'
import { someUser } from 'backend/app/user/test/userTestUtils'
import { UserProps } from 'backend/app/user/domain/User'

export class MockUserAdminServiceFixture {
  mock = mock(UserAdminService)
  instance = instance(this.mock)

  givenThatUserRegistersWithId(id: string) {
    when(this.mock.addUser(anything())).thenResolve(someUser({ id }))
  }

  verifyUserCreated(request: UserProps) {
    verify(this.mock.addUser(deepEqual(request))).called()
  }
}
