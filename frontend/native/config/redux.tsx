import React from 'react'
import { AsyncStorage } from 'react-native'
import { AppState } from '../state'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { AppReducers, CLIENT_STATE_VERSION } from '../state'
import { Notifications } from 'expo'
import { createEventReminderNotification } from '../app/twt/Calendar/EventReminderNotification'
import { subMinutes } from 'date-fns'

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

    try {
      ReduxProvider.initialState = await this.migrate(
        version,
        JSON.parse(await AsyncStorage.getItem(PERSISTED_STATE_KEY)),
      )

      if (ReduxProvider.initialState) {
        console.log(
          `[STORE] Initialize with user state:\n${JSON.stringify(
            ReduxProvider.initialState,
            null,
            2,
          )}`,
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  private static async migrate(version: string, state: AppState) {
    if (version === '2') {
      console.log(`[STORE] Migrating saved notifications to v2`)

      await Notifications.cancelAllScheduledNotificationsAsync()
      for (const event of Object.values(state.calendarEvents || {})) {
        if (!event) continue

        const notification = createEventReminderNotification(event.details)
        event.notificationToken = await Notifications.scheduleLocalNotificationAsync(
          notification,
          {
            time: subMinutes(event.details.startTime, 30),
          },
        )
      }

      return state
    }

    if (!version || version === '1') {
      console.log(
        `[STORE] Persisted user state is an incompatible version. Starting in clean state.`,
      )

      return undefined
    }

    return state
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
