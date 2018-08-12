import Container from 'typedi'
import {
  CrudRepositoryConstructor,
  CrudRepository,
} from '../common/CrudRepository'
import { withDb } from './integrationTestUtils'

interface CrudRepositoryTestProps<T extends { id: string }, Props> {
  /** Function returning some props required to insert into the repository */
  example: () => Promise<T>

  /** Function returning some props required to update into the repository */
  updateExample: () => Partial<Props> | Promise<Partial<Props>>

  /** Type of the repository */
  repository: CrudRepositoryConstructor<T, Props>
}

export function shouldSupportStandardCrudFunctions<
  T extends { id: string },
  Props
>(opts: CrudRepositoryTestProps<T, Props>) {
  it(
    `should get inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const entity = await fixture.givenThatAnEntityHasBeenInserted()

      const foundObject = await fixture.repository.findOne({ id: entity.id })

      expect(foundObject).toMatchObject(entity)
    }),
  )

  it(
    `when entity not inserted, should throw for non-optional get`,
    withDb(async () => {
      const fixture = new Fixture()

      await expect(
        fixture.repository.findOneRequired({ id: '123' }),
      ).rejects.toThrow()
    }),
  )

  it(
    `should delete inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const entity = await fixture.givenThatAnEntityHasBeenInserted()

      await fixture.repository.delete({ id: entity.id })

      expect(
        await fixture.repository.findOne({ id: entity.id }),
      ).toBeUndefined()
    }),
  )

  it(
    `should update inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const exampleUpdateProps = (await opts.updateExample()) as any
      const entity = await fixture.givenThatAnEntityHasBeenInserted()

      await fixture.repository.update(entity.id, exampleUpdateProps)

      expect(await fixture.repository.findOne({ id: entity.id })).toMatchObject(
        {
          ...(entity as any),
          ...exampleUpdateProps,
        },
      )
    }),
  )

  class Fixture {
    repository: CrudRepository<any> = Container.get(opts.repository)

    async givenThatAnEntityHasBeenInserted() {
      return opts.example()
    }
  }
}
