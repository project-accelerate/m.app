import React from 'react'
import { shallow } from 'enzyme'
import { readFileSync } from 'fs'
import { ImageWell } from '../ImageWell'

const image = readFileSync(require.resolve('common/test/somePhoto.jpg'))
const file = new File([image], 'myImage.jpg')

describe(ImageWell, () => {
  it('should render', () => {
    const fixture = new Fixture(<ImageWell value={file} onChange={jest.fn()} />)
    expect(fixture.tree).not.toBeEmptyRender()
  })
})

class Fixture {
  constructor(
    public markup: React.ReactElement<{}>,
    public tree = shallow(markup),
  ) {}
}
