import * as React from 'react'
import { render, hydrate } from 'react-dom'

// Your top level component
import App from '../frontend/App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? render : hydrate
  renderMethod(<App />, document.getElementById('root'))
}
