import React from 'react'
import { AsyncStorage, AppState } from 'react-native'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { AppReducers, CLIENT_STATE_VERSION } from '../state'

const VERSION_KEY = 'state-version'
const PERSISTED_STATE_KEY = 'persisted-state'

export class ReduxProvider extends React.Component {
  private static initialState?: any

  static async setup() {
    const version = await AsyncStorage.getItem(VERSION_KEY)
    if (!version) {
      console.log(
        `[STORE] No persisted user state found. Starting in clean state.`,
      )
      return
    }

    if (version !== CLIENT_STATE_VERSION) {
      console.log(
        `[STORE] Persisted user state is an incompatible version. Starting in clean state.`,
      )
      return
    }

    try {
      ReduxProvider.initialState = JSON.parse(
        await AsyncStorage.getItem(PERSISTED_STATE_KEY),
      )
      console.log(
        `[STORE] Restored persistent user state:\n${JSON.stringify(
          ReduxProvider.initialState,
          null,
          2,
        )}`,
      )
    } catch (error) {
      console.error(error)
    }
  }

  private persistenceMiddleware: Middleware<
    {},
    AppState
  > = api => next => action => {
    const result = next(action)
    this.persistState(api.getState())
    return result
  }

  private loggerMiddleware: Middleware<{}, AppState> = () => next => action => {
    const result = next(action)
    console.log(`[STORE] Dispatched action ${JSON.stringify(action)}`)
    return result
  }

  private store = createStore(
    combineReducers(AppReducers),
    ReduxProvider.initialState || {},
    applyMiddleware(thunk, this.persistenceMiddleware, this.loggerMiddleware),
  )

  private async persistState(state: AppState) {
    try {
      await AsyncStorage.multiSet([
        [VERSION_KEY, CLIENT_STATE_VERSION],
        [PERSISTED_STATE_KEY, JSON.stringify(state)],
      ])
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>
  }
}
