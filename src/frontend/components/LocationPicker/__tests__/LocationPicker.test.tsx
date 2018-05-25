import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme';
import { LocationPicker } from '../LocationPicker';
import { LocationPickerContent } from '../LocationPickerContent';
import { someEventWithValue, someEvent } from '../../../../test/testUtils';

jest.mock('../geolocation')

describe('LocationPicker', () => {
  it('should start with existing value', () => {
    const fixture = new Fixture(
      <LocationPicker
        value="BN2"
        onChange={jest.fn()}
      />
    )

    expect(fixture.tree.find(LocationPickerContent))
      .toHaveProp('value', 'BN2')
  })

  it('should render search changes', () => {
    const fixture = new Fixture(
      <LocationPicker
        value="BN2"
        onChange={jest.fn()}
      />
    )

    fixture.enterPostcode("BN1")

    expect(fixture.tree.find(LocationPickerContent))
      .toHaveProp('value', 'BN1')
  })

  it('should reject invalid code', () => {
    const onChange = jest.fn()
    const fixture = new Fixture(
      <LocationPicker
        value="BN2"
        onChange={onChange}
      />
    )

    fixture.enterPostcode("BN")
    fixture.search()

    expect(onChange).not.toHaveBeenCalled()
    expect(fixture.content).toHaveProp('error', true)
  })

  it('should accept valid outcode', () => {
    const onChange = jest.fn()
    const fixture = new Fixture(
      <LocationPicker
        value="BN2"
        onChange={onChange}
      />
    )

    fixture.enterPostcode("BN1")
    fixture.search()

    expect(onChange).toHaveBeenCalledWith("BN1")
    expect(fixture.content).toHaveProp('error', false)
  })

  it('should use geolocation', async () => {
    const onChange = jest.fn()
    const fixture = new Fixture(
      <LocationPicker
        value="BN2"
        onChange={onChange}
      />
    )
    
    const coordinates = {
      latitude: 12,
      longitude: 6
    }
  
    givenResolvedGeolocationCoordinates(coordinates)
    givenPositionInfoForCoords(coordinates, { outcode: "BN1" })

    await fixture.useMyLocation()

    expect(onChange).toHaveBeenCalledWith("BN1")
    expect(fixture.content).toHaveProp('error', false)
  })
})

class Fixture {
  tree: ShallowWrapper

  constructor(markup: React.ReactElement<{}>) {
    this.tree = shallow(markup)
  }

  async useMyLocation() {
    await this.content
      .props()
      .onRequestGeolocation()

    this.tree.update()
  }

  enterPostcode(value: string) {
    this.content
      .props()
      .onChange(someEventWithValue(value))

    this.tree.update()
  }

  search() {
    this.content
      .props()
      .onSubmit(someEvent())

    this.tree.update()
  }

  get content() {
    return this.tree.find(LocationPickerContent)
  }
}

function givenPositionInfoForCoords(coords: any, result: any) {
  require('../geolocation')
    .getPositionInfo
    .mockImplementation(async (position: any) => {
      if (position.coords === coords) {
        return result

      } else {
        return {}
      }
    })
}

function givenResolvedGeolocationCoordinates(coords: any) {
  require('../geolocation')
    .getUserPosition
    .mockResolvedValue(Promise.resolve({ coords }))
}
