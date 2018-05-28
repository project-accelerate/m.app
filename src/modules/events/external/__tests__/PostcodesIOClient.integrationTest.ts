import { PostcodesIOClient } from "../PostcodesIOClient";

describe('PostcodeClient', () => {
  it('Looks up postcode', async () => {
    const client = new PostcodesIOClient()
    const result = await client.getPostcode('OX49 5NU')
  
    expect(result.postcode).toEqual("OX49 5NU")
  })

  it('Looks up outcode', async () => {
    const client = new PostcodesIOClient()
    const result = await client.getOutcode('OX49')
  
    expect(result.outcode).toEqual("OX49")
  })
})