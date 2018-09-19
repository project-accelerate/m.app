export function createLogger(tag: string) {
  if (!__DEV__) {
    return (...args: unknown[]) => {}
  }

  return (...args: any[]) => console.log(`[${tag}]`, ...args)
}
