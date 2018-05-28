import { Distance, DistanceUnit } from "../Distance";

describe("Distance", () => {
  it('Converts km to m', () => {
    const d = new Distance(10, DistanceUnit.km)
    expect(d.inMeters).toBe(10_000)
  })
})