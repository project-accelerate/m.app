import glob from 'glob'
import { resolve } from 'path'

export function scanPaths(...patterns: string[]): unknown[] {
  return patterns.flatMap(pattern =>
    glob.sync(pattern).flatMap(file => {
      if (file.includes('.test.') || file.includes('.integrationTest.')) {
        return []
      }

      return Object.values(require(resolve(file)))
    }),
  )
}
