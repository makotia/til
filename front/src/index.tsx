import { Fragment, FunctionComponent, h } from "preact"

import "modern-css-reset"

import Layout from "./components/Layout"
import Routes from "./router"

const App: FunctionComponent = () => (
  <Layout>
    <Routes />
  </Layout>
)

export default App
