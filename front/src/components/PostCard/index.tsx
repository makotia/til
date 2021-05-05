import { h, FunctionalComponent, Fragment } from "preact"

import { route } from "preact-router"
import { style } from "typestyle"

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

const tagsStyle = style({
  display: "flex",
  flexDirection: "row",
})

const tagStyle = style({
  fontSize: "14px",
  margin: "auto 0"
})

const dateStyle = style({
  color: "gray",
})

const PostCard: FunctionalComponent<Props> = ({ post }: Props) => {
  return (
    <div className={rootStyle} onClick={() => route(`/post/${post.id}`)}>
      <p className={titleStyle}>{post.title}</p>
      <Spacer height={4} />
      <div className={tagsStyle}>
        <span>Tags:</span>
        <Spacer width={4} />
        {post.tags.map(t => (
          <Fragment key={t.id}>
            <span className={tagStyle}>#{t.name}</span>
            <Spacer width={4} />
          </Fragment>
        ))}
      </div>
      <Spacer width={8} />
      <p className={dateStyle}>{post.created_at.toLocaleDateString()}</p>
    </div>
  )
}

export default PostCard
