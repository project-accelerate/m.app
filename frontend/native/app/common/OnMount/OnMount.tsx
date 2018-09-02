import React from 'react'

interface OnMountProps {
  children: () => any
}

export class OnMount extends React.Component<OnMountProps> {
  componentDidMount() {
    this.props.children()
  }

  render() {
    return null
  }
}
