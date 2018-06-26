import { action } from '@storybook/addon-actions'
import React from 'react'
import { shallow } from 'enzyme'
import { EditDialog } from '../EditDialog'

describe(EditDialog, () => {
  it('should render', () => {
    const fixture = new Fixture(
      (
        <EditDialog
          title="Title"
          onCancel={action('cancel')}
          onSubmit={action('submit')}
        />
      ),
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
