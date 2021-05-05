import { h, FunctionComponent, ComponentChildren } from "preact"

import { css } from "goober"

type Props = {
  children: ComponentChildren
}

const rootStyle = css({
  maxWidth: "100vw",
  width: "1000px",
  margin: "0 auto",
  padding: "0 .5rem",
  textAlign: "center",
})

const mainStyle = css({
  minHeight: "calc(100vh - 40px)"
})

const footerStyle = css({
  textAlign: "center",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  "*": {
    color: "black",
    textDecoration: "none",
    margin: "auto 0",
  }
})

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <div className={rootStyle}>
      <main className={mainStyle}>
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
