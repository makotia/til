import {FunctionComponent, h} from "preact"

import { style } from "typestyle"

type Props = {
  text: string
}

const rootStyle = style({
  backgroundColor: "#ff96f6",
  borderRadius: "10px",
  padding: "10px",
  width: "100%",
})

const Alert: FunctionComponent<Props> = ({ text }: Props) => {
  return (
    <div className={rootStyle}>
      <p>{text}</p>
    </div>
  )
}

export default Alert
