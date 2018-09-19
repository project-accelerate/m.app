import { graphQlClient } from '../../../config/graphql'
import { PrivacyOptOutMutationVariables } from '../../../queries'
import PrivacyOptOut from './PrivacyOptOut.graphql'

export namespace settings {
  export async function privacyOptOut(
    variables: PrivacyOptOutMutationVariables,
  ) {
    await graphQlClient.mutate({
      variables,
      mutation: PrivacyOptOut,
    })
  }
}
