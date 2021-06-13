import { h, FunctionalComponent } from "preact"

import { route } from "preact-router"
import { style } from "typestyle"

import { formatJA, strToDayjs } from "../../lib/date"
import { Post } from "../../types"
import Spacer from "../Spacer"

type Props = {
  post: Post,
}

const rootStyle = style({
  width: "100%",
  textAlign: "left",
  border: "1px solid black",
  borderRadius: "10px",
  padding: ".5rem",
  $nest: {
    "&:hover": {
      cursor: "pointer",
    },
  }
})

const titleStyle = style({
  fontSize: "20px",
})

const dateStyle = style({
  color: "gray",
})

const centerStyle = style({
  textAlign: "center",
})

const PostCard: FunctionalComponent<Props> = ({ post }: Props) => {
  return (
    <div className={rootStyle} onClick={() => route(`/post/${post.id}`)}>
      <p className={titleStyle}>{post.title}</p>
      <Spacer height={4} />
      <p className={dateStyle}>{formatJA(strToDayjs(post.created_at))}</p>
    </div>
  )
}

export const PostCreateCard: FunctionalComponent = () => {
  return (
    <div className={rootStyle} onClick={() => route("/post/new")}>
      <p className={[titleStyle, centerStyle].join(" ")}>＋新規作成</p>
    </div>
  )
}

export default PostCard
