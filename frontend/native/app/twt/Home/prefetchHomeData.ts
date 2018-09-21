import { HomeScreenQueryVariables } from '../../../queries'
import { graphQlClient } from '../../../config/graphql'
import HomeScreenQueryDocument from './HomeScreen.graphql'

export async function prefetchHomeData(variables: HomeScreenQueryVariables) {
  await graphQlClient.query({
    query: HomeScreenQueryDocument,
    variables,
  })
}
