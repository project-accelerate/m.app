import * as React from 'react'
import { LocationPickerContent } from './LocationPickerContent';
import { getUserPosition, getPositionInfo } from './geolocation';
import { isFullPostcode, isOutcode } from '../../../common/postcodeValidator';

interface LocationPickerProps {
  /** Current selected postcode/outcode */
  value: string

  /**
   * Fired to request postcode change.
   * Guaranteed to be a syntactically correct outcode.
   */
  onChange: (x: string) => void
}

interface LocationPickerState {
  value?: string
  error: boolean
}

export class LocationPicker extends React.Component<LocationPickerProps, LocationPickerState> {
  state: LocationPickerState = { error: false }

  get renderedValue() {
    return this.state.value || this.props.value
  }

  render() {
    return (
      <LocationPickerContent
        value={this.renderedValue}
        error={this.state.error}
        onChange={event => {
          this.setState({
            value: event.currentTarget.value,
            error: false
          })
        }}
        onRequestGeolocation={async () => {
          const position = await getUserPosition()
          const positionInfo = await getPositionInfo(position)
        
          if (positionInfo) {
            this.props.onChange(positionInfo.outcode)
            this.setState({ error: false })
          }
        }}
        onSubmit={event => {
          event.preventDefault()
          event.stopPropagation()

          const postcode = this.renderedValue
          if (isOutcode(postcode) || isFullPostcode(postcode)) {
            this.props.onChange(postcode)
            this.setState({ error: false })

          } else {
            this.setState({ error: true })
          }
        }}
      />
    )
  }
}
