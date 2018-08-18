import {
  mock,
  instance,
  when,
  anything,
  verify,
  deepEqual,
  anyOfClass,
} from 'ts-mockito'
import { CrudRepository } from '../CrudRepository'
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

    when(this.mock.insert(anyOfClass(Array))).thenCall(items =>
      items.map((props: any) => ({ ...props, id })),
    )
  }

  givenObjectReturnedFromFindById(object: T) {
    const repository = this.mock

    when(repository.findOne(deepEqual({ id: object.id }))).thenResolve(object)
    when(repository.findOneRequired(deepEqual({ id: object.id }))).thenResolve(
      object,
    )
    when(repository.findOne(deepEqual({ id: object.id }))).thenResolve(object)
  }

  givenObjectsReturnedFromFindAll(objects: Props[]) {
    const repository = this.mock

    when(repository.findAll()).thenResolve(objects as any)
  }

  verifyInserted(props: Props | Props[]) {
    if (Array.isArray(props)) {
      verify(this.mock.bulkInsert(deepEqual(props))).called()
    } else {
      verify(this.mock.insert(deepEqual(props))).called()
    }
  }
}
