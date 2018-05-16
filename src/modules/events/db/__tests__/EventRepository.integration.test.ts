import { getCustomRepository } from "typeorm";
import { EventRepository } from "../EventRepository";
import { someString } from "../../../../test/testUtils";
import { withDb } from "../../../../test/integrationTestUtils";

describe('EventRepository', () => {
  it('can get inserted events', withDb(async () => {
    const repository = getCustomRepository(EventRepository)

    const id = await repository.insert({
      name: someString()
    })

    const foundEvent = await repository.findOne(id)
    expect(foundEvent).toMatchObject({
      id,
      name: someString()
    })
  }))
})
