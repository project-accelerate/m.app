import glob from 'glob'
import { resolve, sep } from 'path'

export function scanPaths(...patterns: string[]): unknown[] {
  return patterns.flatMap(pattern =>
    glob.sync(pattern).flatMap(file => {
      if (isTestFile(file)) {
        return []
      }

      return Object.values(require(resolve(file)))
    }),
  )
}

function isTestFile(path: string) {
  const components = path.split(sep)
  return components.includes('test') || components.includes('__tests__')
}
