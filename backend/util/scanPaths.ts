import glob from 'glob'
import { resolve } from 'path'

export function scanPaths(...patterns: string[]) {
  for (const pattern of patterns) {
    glob.sync(pattern).forEach(file => {
      require(resolve(file))
    })
  }
}
