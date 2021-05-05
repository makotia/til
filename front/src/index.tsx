import { Fragment, FunctionComponent, h } from "preact"

import "modern-css-reset"

import Routes from "./router"

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  )
}

export default App
