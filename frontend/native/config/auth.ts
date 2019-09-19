import { graphQlClient } from './graphql'
import gql from 'graphql-tag'
import UserExists from './UserExists.graphql'

export const checkUserExists = async (id: string) => {
  try {
    const res = await graphQlClient.query({
      query: gql`
        query UserExists($id: String!) {
          user(id: $id) {
            id
            consentToContact
          }
        }
      `,
      variables: { id },
      fetchPolicy: "network-only"
    })
    
    console.log(res)
    if (!res.errors || res.errors.length === 0) {
      return true
    }

  } catch {}

  return false
}
