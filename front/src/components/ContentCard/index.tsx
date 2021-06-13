import { h, FunctionComponent } from "preact"

import axios from "axios"
import { useState } from "preact/hooks"
import { style } from "typestyle"

import { BASE_URL } from "../../consts"
import { formatJA, strToDayjs } from "../../lib/date"
import { getToken } from "../../lib/token"
import { Content } from "../../types"

const rootStyle = style({
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid black",
})

const dateStyle = style({
  color: "gray",
  fontSize: "12px",
})

type AddContentProps = {
  postId: string;
  contentId?: string;
  refetchFunc: (id: string) => void;
}

const ContentCard: FunctionComponent<Content> = ({ content, created_at }: Content) => {
  return (
    <div className={rootStyle}>
      <p className={dateStyle}>{formatJA(strToDayjs(created_at))}</p>
      <p>{content}</p>
    </div>
  )
}

export const AddContent: FunctionComponent<AddContentProps> = (props) => {
  const [content, setContent] = useState<string>("")
  const token = getToken()
  const submit = () => {
    axios.post<Content>(
      `${BASE_URL}/posts/${props.postId}/contents`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        props.refetchFunc(props.postId)
        setContent("")
      })
      .catch(err => console.error(err))
  }
  return (
    <div className={rootStyle}>
      <textarea value={content} onInput={e => setContent(e.currentTarget.value)} />
      <button onClick={submit}>投稿</button>
    </div>
  )
}

export default ContentCard
