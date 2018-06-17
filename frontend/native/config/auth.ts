import { TokenManager } from 'frontend.common/auth'

export const auth = new TokenManager({
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
})
