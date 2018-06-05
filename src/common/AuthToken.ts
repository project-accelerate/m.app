export interface AuthToken {
  sub: string
  roles: string[]
  exp: number
}
