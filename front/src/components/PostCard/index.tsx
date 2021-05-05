import { h, FunctionalComponent, Fragment } from "preact"

import { css } from "goober"
import { route } from "preact-router"

import { Post } from "../../types"
import Spacer from "../Spacer"

type Props = {
  post: Post,
}

const rootStyle = css({
  width: "100%",
  textAlign: "left",
  border: "1px solid black",
  borderRadius: "10px",
  padding: ".5rem",
  "&:hover": {
    cursor: "pointer",
  },
})

const titleStyle = css({
  fontSize: "20px",
})

const tagsStyle = css({
  display: "flex",
  flexDirection: "row",
})

const tagStyle = css({
  fontSize: "14px",
  margin: "auto 0"
})

const dateStyle = css({
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
