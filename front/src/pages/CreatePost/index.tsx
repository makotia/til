import { Fragment, FunctionComponent, h } from "preact"

import axios from "axios"
import { route } from "preact-router"
import { useState } from "preact/hooks"

import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { getToken } from "../../lib/token"
import { Post } from "../../types"

const CreatePost: FunctionComponent = () => {
  const [title, setTitle] = useState<string>("")
  const token = getToken()
  const createPost = () => {
    axios.post<Post>(
      `${BASE_URL}/posts`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => route(`/post/${res.data.id}`, true))
      .catch(e => console.error(e))
  }
  return (
    <div>
      {token && (
        <Fragment>
          <label>タイトル</label>
          <input value={title} onInput={e => setTitle(e.currentTarget.value)} />
          <Spacer height={8} />
          <button onClick={createPost}>投稿</button>
        </Fragment>
      )}
    </div>
  )
}

export default CreatePost
