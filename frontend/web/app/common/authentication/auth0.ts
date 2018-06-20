import { WebAuth } from 'auth0-js'
import { auth0ClientId, auth0Domain } from '../../../config/properties'

export const auth0 = new WebAuth({
  clientID: auth0ClientId,
  domain: auth0Domain,
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
})
