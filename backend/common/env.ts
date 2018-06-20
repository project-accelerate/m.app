export function getEnv(variable: string) {
  const value = process.env[variable]
  if (!value) {
    throw Error(`Missing required env: ${variable}`)
  }

  return value
}

export function getDevelopmentEnv(variable: string) {
  if (process.env.NODE_ENV === 'production') {
    return undefined
  }

  const value = process.env[variable]
  if (!value) {
    throw Error(`Missing required env: ${variable}`)
  }

  return value
}
