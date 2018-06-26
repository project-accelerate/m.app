import React from 'react'
import { shallow } from 'enzyme'
import { NotificationBar } from '../NotificationBar'

describe(NotificationBar, () => {
  it('should render', () => {
    const fixture = new Fixture(<NotificationBar />)

    expect(fixture.tree).not.toBeEmptyRender()
  })
})

class Fixture {
  constructor(
    public markup: React.ReactElement<{}>,
    public tree = shallow(markup),
  ) {}
}
