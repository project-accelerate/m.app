import * as React from 'react'
import { ShallowWrapper } from 'enzyme';
import { createUnderlinedDropdown } from '../UnderlinedDropdown';
import { Popover } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import { someSyntheticEvent } from '../../../../test/testUtils';

describe('UnderlinedDropdown', () => {
  it('renders value', () => {
    const fixture = new Fixture(
      <ExampleMenu value={{ content: 'Foo' }} />
    )

    expect(fixture.valueText).toHaveText("Foo")
  })

  it('starts undisclosed', () => {
    const fixture = new Fixture(
      <ExampleMenu value={{ content: 'Foo' }} />
    )

    expect(fixture.popover).toHaveProp('open', false)
  })

  it('discloses on click and renders item with value', () => {
    const fixture = new Fixture(
      <ExampleMenu value={{ content: 'Foo' }} />
    )

    fixture.click()

    expect(fixture.popover).toHaveProp('open', true)
    expect(fixture.content).toHaveProp('value', { content: 'Foo' })
  })

  it('hides on change and fires event listener', () => {
    const onChange = jest.fn()
    const fixture = new Fixture(
      <ExampleMenu value={{ content: 'Foo' }} onChange={onChange} />
    )

    fixture.click()
    fixture.valueChange({ content: 'Bar' })

    expect(fixture.popover).toHaveProp('open', false)
    expect(onChange).toHaveBeenCalledWith({ content: 'Bar' })
  })

  it('hides on dismiss and does not fire event listener', () => {
    const onChange = jest.fn()
    const fixture = new Fixture(
      <ExampleMenu value={{ content: 'Foo' }} onChange={onChange} />
    )

    fixture.click()
    fixture.dismiss()

    expect(fixture.popover).toHaveProp('open', false)
    expect(onChange).not.toHaveBeenCalled()
  })
})

const ExampleMenu = createUnderlinedDropdown<ExampleValue>({
  render: props => <ExampleContent {...props} />,
  format: value => value.content
})

interface ExampleValue {
  content: string
}

const ExampleContent = (props: { value: ExampleValue, onChange: Function }) => null

class Fixture {
  tree: ShallowWrapper

  constructor(el: React.ReactElement<{}>) {
    const shallow = createShallow({ dive: true })
    this.tree = shallow(el)
  }

  get valueText() {
    return this.tree.find("a")
  }

  get content() {
    return this.tree.find(ExampleContent)
  }

  get popover() {
    return this.tree.find(Popover)
  }

  valueChange(newValue: ExampleValue) {
    this.content.props().onChange(newValue)
    this.tree.update()
  }

  click() {
    this.valueText.simulate('click', someSyntheticEvent())
    this.tree.update()
  }

  dismiss() {
    this.popover.props().onClose(someSyntheticEvent())
    this.tree.update()
  }
}
