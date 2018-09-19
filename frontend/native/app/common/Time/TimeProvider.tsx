import React from 'react'

interface TimeProviderProps {
  granularity: 'minutes' | 'hours'
  children: (time: Date) => React.ReactNode
}

export class TimeProvider extends React.Component<TimeProviderProps> {
  timeout!: any
  state = { time: new Date() }

  handleTick = () => {
    const time = new Date()
    this.setState({ time })

    if (this.props.granularity === 'minutes') {
      this.timeout = setTimeout(
        this.handleTick,
        (60 - time.getSeconds()) * 1_000,
      )
    }

    if (this.props.granularity === 'hours') {
      this.timeout = setTimeout(
        this.handleTick,
        (60 - time.getMinutes()) * 60_000,
      )
    }
  }

  componentDidMount() {
    this.handleTick()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return this.props.children(this.state.time)
  }
}
