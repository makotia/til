import { FunctionComponent, h } from "preact"

import Router, { Route } from "preact-router"

import CreatePost from "./pages/CreatePost"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Post from "./pages/Post"

const Routes: FunctionComponent = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/post/new" component={CreatePost} />
      <Route path="/post/:id" component={Post} />
      <Route path="/login" component={Login} />
    </Router>
  )
}

export default Routes
