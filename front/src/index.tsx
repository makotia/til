import { FunctionComponent, h } from "preact"
import Router, { Route } from "preact-router"

import Home from "./pages/Home"
import Post from "./pages/Post"

const App: FunctionComponent = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/post/:id" component={Post} />
    </Router>
  )
}

export default App
