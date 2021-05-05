import { h, FunctionComponent, ComponentChildren } from "preact"

import { css } from "goober"

type Props = {
  children: ComponentChildren
}

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
  const style = css({
    maxWidth: "100vw",
    width: "1000px",
    margin: "0 auto",
    padding: "0 .5rem",
  })

  return (
    <div className={style}>
      {children}
    </div>
  )
}

export default Layout
