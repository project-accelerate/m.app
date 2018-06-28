import {
  mock,
  instance,
  when,
  anything,
  verify,
  deepEqual,
} from 'ts-mockito/lib/ts-mockito'
import { CrudRepository } from '../../../../common/CrudRepository'

export class MockCrudRepositoryFixture<
  Repository extends CrudRepository<T, Props>,
  T extends { id: string },
  Props
> {
  mock: Repository

  get instance() {
    return instance(this.mock)
  }

  constructor(
    Repository: new (...args: any[]) => CrudRepository<T, Props> & Repository,
  ) {
    this.mock = mock(Repository)
  }

  givenIdReturnedFromInsert(id: string) {
    when(this.mock.insert(anything())).thenResolve(id)
  }

  givenObjectReturnedFromFindOne(object: T) {
    when(this.mock.findOne(object.id)).thenResolve(object)

    when(this.mock.findOneRequired(object.id)).thenResolve(object)
  }

  verifyInserted(props: Props) {
    verify(this.mock.insert(deepEqual(props))).called()
  }
}
