import { Permissions } from 'expo'

import {
  RegisterDeviceMutation,
  RegisterDeviceMutationVariables,
} from '../../../queries'
import RegisterDeviceMutationQueryDocument from './RegisterDeviceMutation.graphql'
import { graphQlClient } from '../../../config/graphql'

export async function requestNotificationPermission() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  )

  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  return finalStatus === 'granted'
}

export async function registerDevice(
  variables: RegisterDeviceMutationVariables,
): Promise<RegisterDeviceMutation['registration']> {
  const result = await graphQlClient.mutate({
    mutation: RegisterDeviceMutationQueryDocument,
    variables,
  })

  if (!result.data) {
    throw Error(result.errors && result.errors.join('; '))
  }

  return result.data && result.data.registration
}
