import { delay } from 'bluebird'
import { action } from '@storybook/addon-actions'

export function asyncAction(label: string) {
  const syncAction = action(label)

  return async (...args: any[]) => {
    await delay(4_000)
  }
}
