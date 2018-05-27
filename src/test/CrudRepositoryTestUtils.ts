import { CrudRepositoryConstructor } from "../common/CrudRepository";
import { map, fromPairs } from "lodash";
import { withDb } from "./integrationTestUtils";

interface CrudRepositoryTestProps<T extends Props, Props> {
  /** Function returning some props required to insert into the repository */
  example: () => Props

  /** Type of the repository */
  repository: CrudRepositoryConstructor<T, Props>

  /**
   * If the table has required foreign key, map of keys to functions
   * creating instances of the referenced types, returning the id
   */
  relationshipExamples?: { [P in keyof Partial<Props>]: () => Promise<string> }
}

export function shouldSupportStandardCrudFunctions<T, Props>(opts: CrudRepositoryTestProps<T, Props>) {
  const Repository = opts.repository
  const type = Repository.tableName
  const createExample = opts.example
  const relationshipExamples = opts.relationshipExamples || {}
  it(`should get inserted ${opts.repository.tableName}s`, withDb(async () => {
    const repository = new Repository()
    const relationships = fromPairs(
      await Promise.all(
        map(relationshipExamples, async (createExample: any, key) => [
          key,
          await createExample()
        ])
      )
    )

    const props = createExample()
    const id = await repository.insert({
      ...props as any,
      ...relationships,
    })

    const foundObject = await repository.findOne(id)
    expect(foundObject).toMatchObject({
      id,
      ...props as any,
      ...relationships,
    })
  }))
}
