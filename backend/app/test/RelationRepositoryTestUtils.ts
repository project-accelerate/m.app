import { CrudRepository } from '../common/CrudRepository'
import { RelationRepository } from '../common/RelationRepository'
import { withDb } from './integrationTestUtils'
import { sortBy } from 'lodash'

interface OneToManyRelationTestProps<
  Key extends string,
  Repository extends CrudRepository & Record<Key, RelationRepository>
> {
  repository: new () => Repository
  relation: Key

  sourceExample: () => Promise<{ id: string }>
  destExample: () => Promise<{ id: string }>
}

export function shouldSupportOneToManyRelation<
  Key extends string,
  Repository extends CrudRepository & Record<Key, RelationRepository<any>>
>(props: OneToManyRelationTestProps<Key, Repository>) {
  describe(props.relation, () => {
    it(
      'should return added relations from findFrom',
      withDb(async () => {
        const fixture = await Fixture.create()

        await fixture.givenRelationBetween(
          fixture.sourceObject,
          fixture.destObjects,
        )

        const relation = await fixture.relation.findFrom(
          fixture.sourceObject.id,
        )

        expect(sortBy(relation, 'id')).toMatchObject(
          sortBy(fixture.destObjects, 'id'),
        )

        expect(relation.length).toEqual(2)
      }),
    )

    it(
      'should return added relation from findOneFrom',
      withDb(async () => {
        const fixture = await Fixture.create()

        await fixture.givenRelationBetween(fixture.sourceObject, [
          fixture.destObjects[0],
        ])

        const relation = await fixture.relation.findOneFrom(
          fixture.sourceObject.id,
        )

        expect(relation).toMatchObject(fixture.destObjects[0])
      }),
    )

    it(
      'should drop from relation afer delete',
      withDb(async () => {
        const fixture = await Fixture.create()

        await fixture.givenRelationBetween(
          fixture.sourceObject,
          fixture.destObjects,
        )

        await fixture.relation.remove(
          fixture.sourceObject.id,
          fixture.destObjects[0].id,
        )

        const relation = await fixture.relation.findFrom(
          fixture.sourceObject.id,
        )

        expect(relation[0]).toMatchObject(fixture.destObjects[1])

        expect(relation.length).toEqual(1)
      }),
    )
  })

  class Fixture {
    static async create() {
      return new Fixture(
        await props.sourceExample(),
        await Promise.all([props.destExample(), props.destExample()]),
      )
    }

    private constructor(public sourceObject: any, public destObjects: any[]) {}

    repository = new props.repository()
    relation = (this.repository[props.relation] as any) as RelationRepository

    async givenRelationBetween(source: { id: string }, dest: { id: string }[]) {
      return this.relation.add(source.id, dest.map(d => d.id))
    }
  }
}
