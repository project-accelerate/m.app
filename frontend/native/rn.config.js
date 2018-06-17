const path = require('path')
const getConfig = require('metro-bundler-config-yarn-workspaces')

module.exports = getConfig(__dirname, {
  nodeModules: path.resolve(__dirname, '..', '..'),
})
