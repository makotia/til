import { Fragment, FunctionComponent, h } from "preact"

import axios from "axios"
import { useEffect, useState } from "preact/hooks"
import { style } from "typestyle"

import Alert from "../../components/Alert"
import ContentCard from "../../components/ContentCard"
import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { formatRelative, strToDayjs } from "../../lib/date"
import { Post } from "../../types"



type Props = {
  id: string;
}

const postStyle = style({
  textAlign: "left"
})

const Index: FunctionComponent<Props> = ({ id }: Props) => {
  const [post, setPost] = useState<Post | undefined>(undefined)
  useEffect(() => {
    const f = async (): Promise<void> => await axios.get<Post>(`${BASE_URL}/posts/${id}`).then(res => setPost(res.data))
    f()
  }, [id])
  return (
    <div className={postStyle}>
      {post && (
        <div>
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
            </Fragment>
          )}
        </div>
      )}
    </div>
  )
}

export default Index
