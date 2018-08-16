import React from 'react'

interface TimeProviderProps {
  granularity: 'minutes' | 'hours'
  children: (time: Date) => React.ReactNode
}

export class TimeProvider extends React.Component<TimeProviderProps> {
  timeout!: number
  state = { time: new Date() }

  handleTick = () => {
    const time = new Date()
    this.setState({ time })

    if (this.props.granularity === 'minutes') {
      setTimeout(this.handleTick, (60 - time.getSeconds()) * 1_000)
    }

    if (this.props.granularity === 'hours') {
      setTimeout(this.handleTick, (60 - time.getMinutes()) * 60_000)
    }
  }

  componentDidMount() {
    this.handleTick()
  }

  render() {
    return this.props.children(this.state.time)
  }
}
