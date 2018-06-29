import { mock, instance, when, anything, verify, deepEqual } from 'ts-mockito'
import { CrudRepository } from '../../../../common/CrudRepository'
import { MockRelationFixture } from './MockRelationFixture'

export class MockCrudRepositoryFixture<
  Repository extends CrudRepository<T, Props>,
  T extends { id: string },
  Props
> {
  mock: Repository

  get instance() {
    return instance(this.mock)
  }

  constructor(Repository: new () => Repository) {
    this.mock = mock(Repository)
  }

  mockRelation(key: keyof Repository, mock: MockRelationFixture<any>) {
    when(this.mock[key]).thenReturn(mock.instance as any)
    return this
  }

  givenIdReturnedFromInsert(id: string) {
    when(this.mock.insert(anything())).thenCall(props => ({ ...props, id }))
  }

  givenObjectReturnedFromFindOne(object: T) {
    when(this.mock.findOne(object.id)).thenResolve(object)

    when(this.mock.findOneRequired(object.id)).thenResolve(object)
  }

  verifyInserted(props: Props) {
    verify(this.mock.insert(deepEqual(props))).called()
  }
}
