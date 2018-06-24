import { WebAuth } from 'auth0-js'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../../config/properties'

export const auth0 = new WebAuth({
  clientID: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN,
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
})
