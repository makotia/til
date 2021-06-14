import { h, FunctionComponent, ComponentChildren } from "preact"

import { styled, setup } from "goober"
import { route } from "preact-router"

import Spacer from "../Spacer"

setup(h)

type Props = {
  children: ComponentChildren
}

const Root = styled("div")({
  maxWidth: "100vw",
  width: "1000px",
  margin: "0 auto",
  padding: "0 .5rem",
  textAlign: "center",
})

const Main = styled("main")({
  minHeight: "calc(100vh - 40px)",
})

const Footer = styled("footer")({
  textAlign: "center",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  "> *": {
    color: "black",
    textDecoration: "none",
    margin: "auto 0",
  },
})

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <Root>
      <Main>
        <Spacer height={8} />
        <h1 onClick={() => route("/")}>Today I Learned</h1>
        {children}
      </Main>
      <Footer>
        <a target="blank" rel="noreferrer noopener" href="https://github.com/makotia">
          Created by @makotia
        </a>
      </Footer>
    </Root>
  )
}

export default Layout
