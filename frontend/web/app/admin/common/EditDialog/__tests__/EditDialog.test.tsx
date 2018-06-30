import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { EditDialog } from '../EditDialog'

describe(EditDialog, () => {
  it('should render', () => {
    const fixture = new Fixture()

    expect(fixture.tree).not.toBeEmptyRender()
  })
})

class Fixture {
  tree: ShallowWrapper
  cancel = jest.fn()
  submit = jest.fn()

  constructor() {
    this.tree = shallow(
      <EditDialog
        title="Title"
        initial={{}}
        onCancel={this.cancel}
        onSubmit={this.submit}
      />,
    )
  }
}
