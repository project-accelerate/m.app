import React from 'react'
import { createTransition } from '../Layouts/Transitioner'
import { LoadingOverlay } from '../Widgets/Widgets'

interface WizardConfig<T> {
  stages: Array<(props: WizardStageProps<T>) => JSX.Element>
}

export interface WizardStageProps<T> {
  onSubmit: (props: Partial<T>) => void
  onSkip: () => void
}

interface WizardProps<T> {
  initialState: T
  onCompleted: (value: T) => void
}

export function createWizard<T>(config: WizardConfig<T>) {
  return class Wizard extends React.Component<WizardProps<T>> {
    state = this.props.initialState
    stages = config.stages.slice()
    initialStage = this.stages.shift()
    transitioner = createTransition()

    handleSubmit = (value: Partial<T>) => {
      this.setState(value, () => {
        this.advance()
      })
    }

    handleSkip = () => {
      this.advance()
    }

    async advance() {
      const nextStage = this.stages.shift()

      if (nextStage) {
        this.transitioner.transitionTo(this.renderStage(nextStage as any))
      } else {
        this.transitioner.transitionTo(<LoadingOverlay />)
        await this.props.onCompleted(this.state)
      }
    }

    renderStage(Stage: React.ComponentType<WizardStageProps<T>>) {
      return <Stage onSkip={this.handleSkip} onSubmit={this.handleSubmit} />
    }

    render() {
      if (!this.initialStage) {
        return null
      }

      return this.transitioner.render({
        initialContent: this.renderStage(this.initialStage as any),
      })
    }
  }
}
