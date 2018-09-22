import {
  mock,
  instance,
  when,
  verify,
  objectContaining,
  deepEqual,
} from 'ts-mockito'
import { RelationRepository } from '../RelationRepository'

export class MockRelationFixture<T> {
  mock = mock(RelationRepository)
  instance = instance(this.mock)

  givenRelation(opts: { from: string; to: T[] }) {
    when(this.mock.findFrom(opts.from)).thenResolve(opts.to)

    when(this.mock.findOneFrom(opts.from)).thenResolve(opts.to[0])
  }

  verifyAdded(from: string, to: string) {
    verify(this.mock.add(from, objectContaining([to]) as any)).called()
  }

  verifyReplaced(from: string, to: string[]) {
    verify(this.mock.replace(from, deepEqual(to))).called()
  }
}
