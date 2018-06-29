import { CrudRepositoryConstructor } from '../common/CrudRepository'
import { map, fromPairs } from 'lodash'
import { withDb } from './integrationTestUtils'
import Container from 'typedi'

interface CrudRepositoryTestProps<T extends Props & { id: string }, Props> {
  /** Function returning some props required to insert into the repository */
  example: () => Promise<T>

  /** Function returning some props required to update into the repository */
  updateExample: () => Partial<Props>

  /** Type of the repository */
  repository: CrudRepositoryConstructor<T, Props>
}

export function shouldSupportStandardCrudFunctions<
  T extends Props & { id: string },
  Props
>(opts: CrudRepositoryTestProps<T, Props>) {
  it(
    `should get inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const entity = await fixture.givenThatAnEntityHasBeenInserted()

      const foundObject = await fixture.repository.findOne(entity.id)

      expect(foundObject).toMatchObject(entity)
    }),
  )

  it(
    `when entity not inserted, should throw for non-optional get`,
    withDb(async () => {
      const fixture = new Fixture()

      await expect(fixture.repository.findOneRequired('123')).rejects.toThrow()
    }),
  )

  it(
    `should delete inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const entity = await fixture.givenThatAnEntityHasBeenInserted()

      await fixture.repository.delete(entity.id)

      expect(await fixture.repository.findOne(entity.id)).toBeUndefined()
    }),
  )

  it(
    `should update inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const entity = await fixture.givenThatAnEntityHasBeenInserted()

      await fixture.repository.update(entity.id, fixture.exampleUpdateProps)

      expect(await fixture.repository.findOne(entity.id)).toMatchObject({
        ...(entity as any),
        ...fixture.exampleUpdateProps,
      })
    }),
  )

  class Fixture {
    repository = Container.get(opts.repository)

    exampleUpdateProps = opts.updateExample() as any

    async givenThatAnEntityHasBeenInserted() {
      return opts.example()
    }
  }
}
