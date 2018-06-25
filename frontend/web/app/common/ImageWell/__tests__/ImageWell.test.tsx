import React from 'react'
import { shallow } from 'enzyme'
import { readFileSync } from 'fs'
import { FieldState } from 'formstate'
import { ImageWell, ImageWellValue } from '../ImageWell'

const image = readFileSync(require.resolve('common/test/somePhoto.jpg'))
const file = new File([image], 'myImage.jpg')

describe(ImageWell, () => {
  it('should render', () => {
    const fixture = new Fixture(
      <ImageWell image={new FieldState<ImageWellValue>(file)} />,
    )
    expect(fixture.tree).not.toBeEmptyRender()
  })
})

class Fixture {
  constructor(
    public markup: React.ReactElement<{}>,
    public tree = shallow(markup),
  ) {}
}
