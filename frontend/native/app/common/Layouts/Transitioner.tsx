import React from 'react'
import { StyleSheet, Animated, View, ViewStyle, StyleProp } from 'react-native'
import { LayoutEvent } from 'react-navigation'

interface TransitionerProps {
  initialContent: React.ReactNode
  style?: StyleProp<ViewStyle>
}

interface TransitionerState {
  current?: React.ReactNode
  next?: React.ReactNode
  activeTransition?: Transition
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
  onCompleted: () => void
}

abstract class Transition {
  constructor(protected context: TransitionContext) {}

  transitionDidStart() {}

  abstract getTransitionOutStyle(): StyleProp<ViewStyle>
  abstract getTransitionInStyle(): StyleProp<ViewStyle>
}

export class SlideRightToLeft extends Transition {
  transformIn = new Animated.Value(this.context.layout.width)
  transformOut = new Animated.Value(0)

  transitionDidStart() {
    Animated.spring(this.transformIn, {
      toValue: 0,
    }).start(this.context.onCompleted)

    Animated.spring(this.transformOut, {
      toValue: -this.context.layout.width,
    }).start()
  }

  getTransitionOutStyle() {
    return {
      transform: [{ translateX: this.transformOut as any }],
    }
  }

  getTransitionInStyle() {
    return {
      transform: [{ translateX: this.transformIn as any }],
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

    static transitionTo(el: React.ReactNode) {
      if (!instance) {
        throw Error('Cannot transition before render')
      }

      return instance.transitionTo(el)
    }

    state: TransitionerState = {
      current: this.props.initialContent,
    }
    layout!: {
      x: number
      y: number
      width: number
      height: number
    }

    queue: React.ReactNode[] = []

    componentDidMount() {
      instance = this
    }

    transitionTo(
      el: React.ReactNode,
      kind: TransitionKind = defaultTransition,
    ) {
      return new Promise(resolve => {
        const context = {
          layout: this.layout,
          onCompleted: () => {
            this.setState(
              {
                current: this.state.next,
                next: undefined,
                activeTransition: undefined,
              },
              resolve,
            )
          },
        }

        this.setState({ next: el, activeTransition: new kind(context) }, () => {
          if (this.state.activeTransition) {
            this.state.activeTransition!.transitionDidStart()
          }
        })
      })
    }

    handleLayout = (event: LayoutEvent) => {
      this.layout = event.nativeEvent.layout
    }

    render() {
      const { activeTransition, current, next } = this.state
      const containerProps = {
        style: style.container,
        onLayout: this.handleLayout,
      }

      if (!activeTransition) {
        return (
          <View {...containerProps}>
            <Animated.View style={style.item}>{current}</Animated.View>
          </View>
        )
      }

      return (
        <View {...containerProps}>
          {current && (
            <Animated.View
              style={[
                style.item,
                this.props.style,
                activeTransition && activeTransition.getTransitionOutStyle(),
              ]}
            >
              {current}
            </Animated.View>
          )}
          {next && (
            <Animated.View
              style={[
                style.item,
                this.props.style,
                activeTransition && activeTransition.getTransitionInStyle(),
              ]}
            >
              {next}
            </Animated.View>
          )}
        </View>
      )
    }
  }

  return Transitioner
}
