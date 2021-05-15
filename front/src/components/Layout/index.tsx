import { h, FunctionComponent, ComponentChildren } from "preact"

import { route } from "preact-router"
import { style } from "typestyle"

import Spacer from "../Spacer"

type Props = {
  children: ComponentChildren
}

const rootStyle = style({
  maxWidth: "100vw",
  width: "1000px",
  margin: "0 auto",
  padding: "0 .5rem",
  textAlign: "center",
})

const mainStyle = style({
  minHeight: "calc(100vh - 40px)",
})

const footerStyle = style({
  textAlign: "center",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  $nest: {
    "*": {
      color: "black",
      textDecoration: "none",
      margin: "auto 0",
    }
  }
})

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <div className={rootStyle}>
      <main className={mainStyle}>
        <Spacer height={8} />
        <h1 onClick={() => route("/")}>Today I Learned</h1>
        {children}
      </main>
      <footer className={footerStyle}>
        <a target="blank" rel="noreferrer noopener" href="https://github.com/makotia">
          Created by @makotia
        </a>
      </footer>
    </div>
  )
}

export default Layout
