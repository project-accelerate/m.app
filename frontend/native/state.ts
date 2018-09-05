import { connect } from 'react-redux'
import {
  createStructuredSelector,
  Selector,
  ParametricSelector,
} from 'reselect'
import { bindActionCreators, AnyAction, Dispatch, Action } from 'redux'
import { mapValues } from 'lodash'
import { registration } from './app/twt/Registration/registrationState'
import { calendar } from './app/twt/Calendar/calendarState'
import { ThunkDispatch } from 'redux-thunk'

/** Bump this number to invalidate the persisted state */
export const CLIENT_STATE_VERSION = '1'

/** Object containing all action creators in the app */
export const AppActions = {
  registration: registration.actions,
  calendar: calendar.actions,
}

/** Object containing all reducers in the app */
export const AppReducers = {
  ...registration.reducers,
  ...calendar.reducers,
}

/** Type of application state object, derived from reducer definitions */
export type AppState = {
  [P in keyof typeof AppReducers]:
    | ReturnType<(typeof AppReducers)[P]>
    | undefined
}

type AppActionDefs = typeof AppActions

type ComponentActions = {
  [NS in keyof AppActionDefs]: {
    [P in keyof AppActionDefs[NS]]: BoundActionCreator<AppActionDefs[NS][P]>
  }
}

type BoundActionCreator<Fn> = Fn extends (...args: any[]) => any
  ? (ReturnType<Fn> extends Function
      ? (params: FirstArgument<Fn>) => ReturnType<ReturnType<Fn>>
      : (params: FirstArgument<Fn>) => void)
  : never

type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any
  ? U
  : any

/** Wrap an known action type with a placeholder for other action types */
export type ReducerAction<T> = T | { type: '@other' }

export type GetStateFn = () => AppState

/** Dispatch function including thunk actions */
export type AppDispatch<A extends Action = AnyAction> = ThunkDispatch<
  AppState,
  A,
  A
> &
  Dispatch<A>

/**
 * Component factory for declaring a compoonent that selects some
 * client-side state and passes it through to a render function.
 */
export function createStateConnector<Props, T>(
  selectorsFactory: () => {
    [P in keyof T]: ParametricSelector<AppState, Props, T[P]>
  },
): React.ComponentType<StateConnectorProps<Props, T>> {
  const connectComponent = connect(
    () => {
      const selectors = selectorsFactory()
      return createStructuredSelector(selectors)
    },
    dispatch => ({
      actions: mapValues(AppActions, (actionNamespace: any) =>
        mapValues(actionNamespace, (actionCreator: any) =>
          bindActionCreators(actionCreator, dispatch),
        ),
      ),
    }),
  )

  return connectComponent(
    (props: StateConnectorProps<Props, T>) =>
      props.children(props as any) as any,
  ) as any
}

/**
 * Hack to get around typescript failing to infer parameter types
 * in createStateConnector. Use this if the selectors needs props.
 **/
export function createParametricStateConnector<Props>() {
  return <T>(
    selectors: () => {
      [P in keyof T]: ParametricSelector<AppState, Props, T[P]>
    },
  ) => createStateConnector<Props, T>(selectors)
}

export const WithActions = createStateConnector(() => ({}))

type SelectorRenderProps<T> = T & { actions: ComponentActions }

type StateConnectorProps<Props, T> = Props & {
  children: (renderProps: SelectorRenderProps<T>) => React.ReactNode
}
