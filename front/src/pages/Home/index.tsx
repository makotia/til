import { Fragment, FunctionComponent, h } from "preact"

import axios from "axios"
import Helmet from "preact-helmet"
import { useContext, useEffect, useState } from "preact/hooks"

import { AuthContext } from "../../AuthContext"
import PostCard, { PostCreateCard } from "../../components/PostCard"
import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { Post } from "../../types"

const Index: FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const { token } = useContext(AuthContext)
  useEffect(() => {
    const f = async (): Promise<void> =>
      await axios
        .get<Post[]>(`${BASE_URL}/posts`)
        .then((res) => setPosts(res.data))
    f()
  }, [])
  return (
    <div>
      <Helmet title="TOP | TIL" />
      <p>学んだことを書くよ</p>
      <Spacer height={16} />
      {posts.length === 0 && !token && <p>なにもないよ</p>}
      {token &&
        <Fragment key={0}>
          <PostCreateCard />
          <Spacer height={8} />
        </Fragment>
      }
      {posts.map((p) => {
        if (p === undefined) return
        return (
          <Fragment key={p.id}>
            <PostCard post={p} />
            <Spacer height={8} />
          </Fragment>
        )
      })}
    </div>
  )
}

export default Index
