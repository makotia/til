import { Fragment, FunctionComponent, h } from "preact"

import PostCard from "../../components/PostCard"
import Spacer from "../../components/Spacer"
import { Post } from "../../types"

const Index: FunctionComponent = () => {
  const data: Post[] = []
  return (
    <div>
      <Spacer height={8} />
      <h1>Today I Learned</h1>
      <p>学んだことを書くよ</p>
      <Spacer height={16} />
      {data.length === 0 && <p>なにもないよ</p>}
      {data.map(p => (
        <Fragment key={p.id}>
          <PostCard post={p} />
          <Spacer height={8} />
        </Fragment>
      ))}
    </div>
  )
}

export default Index
