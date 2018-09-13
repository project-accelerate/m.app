import React from 'react'
import { StyleSheet, Animated, View, ViewStyle, StyleProp } from 'react-native'
import { LayoutEvent } from 'react-navigation'

interface TransitionerProps {
  initialContent: JSX.Element
  style?: StyleProp<ViewStyle>
}

interface TransitionerState {
  children: JSX.Element[]
  indexState: Record<number, 'active' | 'in' | 'out' | undefined>
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  item: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface TransitionContext {
  layout: {
    x: number
    y: number
    width: number
    height: number
  }
}

abstract class Transition {
  constructor(protected context: TransitionContext) {}

  abstract enter(): Animated.CompositeAnimation
  abstract exit(): Animated.CompositeAnimation

  abstract getTransitionOutStyle(): StyleProp<ViewStyle>
  abstract getTransitionInStyle(): StyleProp<ViewStyle>
}

export class SlideRightToLeft extends Transition {
  transformIn = new Animated.Value(0)
  transformOut = new Animated.Value(0)

  enter() {
    return Animated.spring(this.transformIn, {
      toValue: -this.context.layout.width,
    })
  }

  exit() {
    return Animated.spring(this.transformOut, {
      toValue: -this.context.layout.width,
    })
  }

  getTransitionOutStyle() {
    return {
      transform: [{ translateX: this.transformOut as any }],
    }
  }

  getTransitionInStyle() {
    return {
      transform: [
        { translateX: this.context.layout.width },
        { translateX: this.transformIn as any },
      ],
    }
  }
}

type TransitionKind = new (props: TransitionContext) => Transition

export function createTransition(
  defaultTransition: TransitionKind = SlideRightToLeft,
) {
  let instance: Transitioner | undefined

  class Transitioner extends React.Component<
    TransitionerProps,
    TransitionerState
  > {
    static render(props: TransitionerProps) {
      return <Transitioner {...props} />
    }

    static transitionTo(el: JSX.Element) {
      if (!instance) {
        throw Error('Cannot transition before render')
      }

      return instance.transitionTo(el)
    }

    state: TransitionerState = {
      children: [this.props.initialContent],
      indexState: {
        0: 'active',
      },
    }

    transitions: Transition[] = []

    layout!: {
      x: number
      y: number
      width: number
      height: number
    }

    componentDidMount() {
      instance = this
    }

    transitionTo(el: JSX.Element, kind: TransitionKind = defaultTransition) {
      console.log('push')
      return new Promise(resolve => {
        const incomingIndex = this.state.children.length
        const outgoingIndex = incomingIndex - 1

        const incomingTransition = new kind({ layout: this.layout })
        const outgoingTransition = new kind({ layout: this.layout })

        this.transitions[incomingIndex] = incomingTransition
        this.transitions[outgoingIndex] = outgoingTransition

        this.setState(
          {
            children: [...this.state.children, el],
            indexState: {
              ...this.state.indexState,
              [incomingIndex]: 'in',
              [outgoingIndex]: 'out',
            },
          },
          () => {
            if (outgoingTransition) {
              outgoingTransition.exit().start(() => {
                this.setState({
                  indexState: {
                    ...this.state.indexState,
                    [outgoingIndex]: undefined,
                  },
                })
              })
            }

            incomingTransition.enter().start(() => {
              this.setState({
                indexState: {
                  ...this.state.indexState,
                  [incomingIndex]: 'active',
                },
              })
            })
          },
        )
      })
    }

    handleLayout = (event: LayoutEvent) => {
      this.layout = event.nativeEvent.layout
    }

    getActiveStyle(i: number) {
      const transition = this.transitions[i]
      const state = this.state.indexState[i]

      if (state === 'in') {
        return transition.getTransitionInStyle()
      }

      if (state === 'out') {
        return transition.getTransitionOutStyle()
      }

      return undefined
    }

    render() {
      console.log(this.state.indexState)
      return (
        <View style={style.container} onLayout={this.handleLayout}>
          {this.state.children
            .map((el, i) => (
              <Animated.View
                key={i}
                style={[style.item, this.props.style, this.getActiveStyle(i)]}
              >
                {el}
              </Animated.View>
            ))
            .filter((el, i) => typeof this.state.indexState[i] !== 'undefined')}
        </View>
      )
    }
  }

  return Transitioner
}
