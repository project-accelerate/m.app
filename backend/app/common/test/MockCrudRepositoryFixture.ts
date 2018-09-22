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

  givenObjectReturnedFromFind(q: any, object: T) {
    const repository = this.mock

    when(repository.findOne(deepEqual(q))).thenResolve(object)
    when(repository.findOneRequired(deepEqual(q))).thenResolve(object)
    when(repository.findOne(deepEqual(q))).thenResolve(object)
  }

  givenObjectReturnedFromFindById(object: T) {
    this.givenObjectReturnedFromFind({ id: object.id }, object)
  }

  givenObjectsReturnedFromFindAll(objects: Props[]) {
    const repository = this.mock

    when(repository.findAll()).thenResolve(objects as any)
  }

  givenObjectsReturnedFromFind(objects: Props[], criteria?: Props) {
    const repository = this.mock
    when(
      repository.find(criteria ? deepEqual(criteria) : anything()),
    ).thenResolve(objects as any)
  }

  verifyInserted(props: Props | Props[]) {
    if (Array.isArray(props)) {
      verify(this.mock.bulkInsert(deepEqual(props))).called()
    } else {
      verify(this.mock.insert(deepEqual(props))).called()
    }
  }

  verifyUpdated(id: string, props: Props) {
    verify(this.mock.update(id, deepEqual(props))).called()
  }
}
