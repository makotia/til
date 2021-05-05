import { FunctionComponent, h } from "preact"

import "modern-css-reset"
import { useHead } from "hoofd"

import Layout from "./components/Layout"
import Routes from "./router"

const App: FunctionComponent = () => {
  useHead({
    title: "TIL",
    language: "ja",
    metas: [
      {
        name: "description",
        content: "Today I Learned"
      }
    ]
  })
  return (
    <Layout>
      <Routes />
    </Layout>
  )
}

export default App
