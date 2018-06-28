import { CrudRepositoryConstructor } from '../common/CrudRepository'
import { map, fromPairs } from 'lodash'
import { withDb } from './integrationTestUtils'
import Container from 'typedi'

interface CrudRepositoryTestProps<T extends Props, Props> {
  /** Function returning some props required to insert into the repository */
  example: () => Props

  /** Function returning some props required to update into the repository */
  updateExample: () => Partial<Props>

  /** Type of the repository */
  repository: CrudRepositoryConstructor<T, Props>

  /**
   * If the table has required foreign key, map of keys to functions
   * creating instances of the referenced types, returning the id
   */
  relationshipExamples?: { [P in keyof Partial<Props>]: () => Promise<string> }
}

export function shouldSupportStandardCrudFunctions<T extends Props, Props>(
  opts: CrudRepositoryTestProps<T, Props>,
) {
  it(
    `should get inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const entity = await fixture.givenThatAnEntityAndItsDependenciesHaveBeenInserted()

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

      const entity = await fixture.givenThatAnEntityAndItsDependenciesHaveBeenInserted()

      await fixture.repository.delete(entity.id)

      expect(await fixture.repository.findOne(entity.id)).toBeUndefined()
    }),
  )

  it(
    `should update inserted entites`,
    withDb(async () => {
      const fixture = new Fixture()

      const entity = await fixture.givenThatAnEntityAndItsDependenciesHaveBeenInserted()

      await fixture.repository.update(entity.id, fixture.exampleUpdateProps)

      expect(await fixture.repository.findOne(entity.id)).toMatchObject({
        ...entity,
        ...fixture.exampleUpdateProps,
      })
    }),
  )

  class Fixture {
    repository = Container.get(opts.repository)

    exampleProps = opts.example() as any

    exampleUpdateProps = opts.updateExample() as any

    exampleDependencyProps = opts.relationshipExamples || {}

    private async createDependencies() {
      return fromPairs(
        await Promise.all(
          map(this.exampleDependencyProps, async (createExample: any, key) => [
            key,
            await createExample(),
          ]),
        ),
      ) as any
    }

    async givenThatAnEntityAndItsDependenciesHaveBeenInserted() {
      const props = {
        ...this.exampleProps,
        ...(await this.createDependencies()),
      }

      const id = await this.repository.insert({
        ...this.exampleProps,
        ...(props as any),
      })

      return { ...props, id }
    }
  }
}
