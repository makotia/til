import { h, FunctionalComponent } from "preact"

import { styled, setup } from "goober"
import { route } from "preact-router"

import { formatJA, strToDayjs } from "../../lib/date"
import { Post } from "../../types"
import Spacer from "../Spacer"

setup(h)

type Props = {
  post: Post,
}

const Root = styled("div")({
  width: "100%",
  textAlign: "left",
  border: "1px solid black",
  borderRadius: "10px",
  padding: ".5rem",
  "&:hover": {
    cursor: "pointer",
  },
})

const SubDate = styled("p")({
  color: "gray",
})

const Center = styled("h3")({
  textAlign: "center"
})

const PostCard: FunctionalComponent<Props> = ({ post }: Props) => {
  return (
    <Root onClick={() => route(`/post/${post.id}`)}>
      <h3>{post.title}</h3>
      <Spacer height={4} />
      <SubDate>{formatJA(strToDayjs(post.created_at))}</SubDate>
    </Root>
  )
}

export const PostCreateCard: FunctionalComponent = () => {
  return (
    <Root onClick={() => route("/post/new")}>
      <Center>＋新規作成</Center>
    </Root>
  )
}

export default PostCard
