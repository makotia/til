import { Fragment, FunctionComponent, h } from "preact"

import axios from "axios"
import { useEffect, useState } from "preact/hooks"

import PostCard from "../../components/PostCard"
import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { Post } from "../../types"

const Index: FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const f = async (): Promise<void> =>
      await axios
        .get<Post[]>(`${BASE_URL}/posts`)
        .then((res) => setPosts(res.data))
    f()
  }, [])
  return (
    <div>
      <p>学んだことを書くよ</p>
      <Spacer height={16} />
      {posts.length === 0 && <p>なにもないよ</p>}
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
