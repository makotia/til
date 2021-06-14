import { FunctionComponent, h } from "preact"

import { styled, setup } from "goober"

type Props = {
  text: string
}

setup(h)

const Root = styled("p")({
  border: "2px solid #ff96f6",
  borderRadius: "10px",
  padding: "10px",
  width: "100%",
})

const Alert: FunctionComponent<Props> = ({ text }: Props) => (
  <Root>{text}</Root>
)

export default Alert
