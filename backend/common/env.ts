export function getEnv(variable: string) {
  const value = process.env[variable]
  if (!value) {
    throw Error(`Missing required env: ${variable}`)
  }

  return value
}
