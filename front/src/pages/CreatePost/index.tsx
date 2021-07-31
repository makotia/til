import { Fragment, FunctionComponent, h } from "preact"

import axios from "axios"
import { styled, setup } from "goober"
import Helmet from "preact-helmet"
import { route } from "preact-router"
import { useState, useContext } from "preact/hooks"

import { AuthContext } from "../../AuthContext"
import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { Post } from "../../types"

setup(h)

const Root = styled("div")({
  display: "flex",
})

const Input = styled("input")({
  width: "calc(100% - 70px)",
  fontSize: "1.5em"
})

const Button = styled("button")({
  width: "48px",
  backgroundColor: "transparent",
  boxShadow: "none",
  border: "1px solid black",
  borderRadius: "5px",
})

const CreatePost: FunctionComponent = () => {
  const [title, setTitle] = useState<string>("")
  const { token } = useContext(AuthContext)
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
      <Helmet title="NEW POST | TIL" />
      {token && (
        <Root>
          <Input value={title} placeholder={"タイトル"} onInput={e => setTitle(e.currentTarget.value)} />
          <Spacer width={8} />
          <Button onClick={createPost}>投稿</Button>
        </Root>
      )}
    </Fragment>
  )
}

export default CreatePost
