import { connect } from 'react-redux'
import {
  createStructuredSelector,
  Selector,
  ParametricSelector,
} from 'reselect'
import { bindActionCreators } from 'redux'
import { mapValues } from 'lodash'

import * as registration from './app/twt/Registration/registration'

/** Bump this number to invalidate the persisted state */
export const CLIENT_STATE_VERSION = '1'

/** Object containing all action creators in the app */
export const AppActions = {
  registration: registration.actions,
}

/** Object containing all reducers in the app */
export const AppReducers = {
  ...registration.reducers,
}

/** Type of application state object, derived from reducer definitions */
export type AppState = {
  [P in keyof typeof AppReducers]: ReturnType<(typeof AppReducers)[P]>
}

/** Wrap an known action type with a placeholder for other action types */
export type ReducerAction<T> = T | { type: '@other' }

/**
 * Component factory for declaring a compoonent that selects some
 * client-side state and passes it through to a render function.
 */
export function createStateConnector<Props, T>(
  selectors: { [P in keyof T]: ParametricSelector<AppState, Props, T[P]> },
): React.ComponentType<StateConnectorProps<Props, T>> {
  const connectComponent = connect(
    createStructuredSelector(selectors),
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

export const WithActions = createStateConnector({})

type SelectorRenderProps<T> = T & { actions: typeof AppActions }

type StateConnectorProps<Props, T> = Props & {
  children: (renderProps: SelectorRenderProps<T>) => React.ReactNode
}
