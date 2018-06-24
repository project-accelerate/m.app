export interface AuthToken {
  sub: string
  'http://peoplesmomentum.com/roles': string[]
  exp: number
}
