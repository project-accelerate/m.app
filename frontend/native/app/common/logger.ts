export function createLogger(tag: string) {
  return (...args: any[]) => console.log(`[${tag}]`, ...args)
}
