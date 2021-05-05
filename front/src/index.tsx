import { FunctionComponent, h } from "preact"

import Router, { Route } from "preact-router"

import Home from "./pages/Home"
import Post from "./pages/Post"

const App: FunctionComponent = () => {
  return (
    <div
      style={{
        font: "14px/1.21 'Helvetica Neue', arial, sans-serif",
        fontWeight: 400,
      }}
    >
      <Router>
        <Route path="/" component={Home} />
        <Route path="/post/:id" component={Post} />
      </Router>
    </div>
  )
}

export default App
