import { createShellCmd } from './utils/shell'

export function postinstall() {
  // Run yarn in native directory instead of using yarn workspaces to install dependencies
  // because react-native conflicts with yarn workspaces
  const yarn = createShellCmd('yarn', { cwd: 'frontend/native' })
  yarn()
}
