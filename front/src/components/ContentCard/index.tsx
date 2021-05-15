import {h, FunctionComponent} from "preact"

import { style } from "typestyle"

import { formatJA, strToDayjs } from "../../lib/date"
import { Content } from "../../types"

const rootStyle = style({
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid black",
})

const dateStyle = style({
  color: "gray",
  fontSize: "12px",
})

const ContentCard: FunctionComponent<Content> = ({ content, created_at }: Content) => {
  return (
    <div className={rootStyle}>
      <p className={dateStyle}>{formatJA(strToDayjs(created_at))}</p>
      <p>{content}</p>
    </div>
  )
}

export default ContentCard
