import { AppState } from 'react-native'
import { Updates } from 'expo'

export async function setupAppUpdates() {
  if (__DEV__) {
    return
  }

  AppState.addEventListener('change', state => {
    if (state === 'active') {
      updateApp()
    }
  })

  await updateApp()
}

async function updateApp() {
  const { isAvailable } = await Updates.checkForUpdateAsync()
  if (!isAvailable) {
    return
  }

  await Updates.fetchUpdateAsync()
  Updates.reloadFromCache()
}
