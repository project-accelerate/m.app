import * as React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

const App = () => (
  <Router>
    <Routes />
  </Router>
)

export default hot(module)(App)
