import * as React from 'react'

/**
 * Enclose dynamic content in this to prevent it from being rendered
 * at build time.
 */
export class DynamicContent extends React.Component<{}, { mounted: boolean }> {
  state = { mounted: false }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  render() {
    return this.state.mounted ? this.props.children : null
  }
}
