import glob from 'glob'

export function scanPaths(...patterns: string[]) {
  for (const pattern of patterns) {
    glob.sync(pattern).forEach(file => {
      require(file)
    })
  }
}
