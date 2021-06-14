import { Fragment, FunctionComponent, h } from "preact"

import axios from "axios"
import { route } from "preact-router"
import { useState } from "preact/hooks"
import { style } from "typestyle"

import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { getToken } from "../../lib/token"
import { Post } from "../../types"

const rootStyle = style({
  display: "flex",
})

const inputStyle = style({
  width: "calc(100% - 70px)",
  fontSize: "1.5em"
})

const buttonStyle = style({
  width: "48px",
  backgroundColor: "transparent",
  boxShadow: "none",
  border: "1px solid black",
  borderRadius: "5px",
})

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
    <Fragment>
      {token && (
        <div className={rootStyle}>
          <input className={inputStyle} value={title} placeholder={"タイトル"} onInput={e => setTitle(e.currentTarget.value)} />
          <Spacer width={8} />
          <button className={buttonStyle} onClick={createPost}>投稿</button>
        </div>
      )}
    </Fragment>
  )
}

export default CreatePost
