import { Fragment, FunctionComponent, h } from "preact"

import axios from "axios"
import { styled, setup } from "goober"
import Helmet from "preact-helmet"
import { useContext, useEffect, useState } from "preact/hooks"

import { AuthContext } from "../../AuthContext"
import Alert from "../../components/Alert"
import ContentCard, { AddContent } from "../../components/ContentCard"
import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { formatRelative, strToDayjs } from "../../lib/date"
import { Post } from "../../types"

setup(h)

type Props = {
  id: string;
}

const PostContainer = styled("div")({
  textAlign: "left"
})

const Index: FunctionComponent<Props> = ({ id }: Props) => {
  const [post, setPost] = useState<Post | undefined>(undefined)
  const { token } = useContext(AuthContext)
  const fetchData: (id: string) => void = async (id): Promise<void> => await axios.get<Post>(`${BASE_URL}/posts/${id}`).then(res => setPost(res.data))
  useEffect(() => {
    fetchData(id)
  }, [id])
  return (
    <PostContainer>
      {post && (
        <Fragment>
          <Helmet title={`${post.title} | TIL`} />
          <h2>{post.title}</h2>
          <Spacer height={8} />
          <Alert text={`この記事は${formatRelative(strToDayjs(post.created_at))}に投稿されたため、最新の情報ではありません。`} />
          <Spacer height={8} />
          {post.contents && (
            <Fragment>
              {post.contents.map(c => (
                <Fragment key={c.id}>
                  <ContentCard id={c.id} content={c.content} created_at={c.created_at} />
                  <Spacer height={8} />
                </Fragment>
              ))}
              {token && <AddContent postId={id} refetchFunc={fetchData} />}
            </Fragment>
          )}
        </Fragment>
      )}
    </PostContainer>
  )
}

export default Index
