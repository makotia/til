import { h, FunctionComponent } from "preact"

import axios from "axios"
import { styled, setup } from "goober"
import { useState } from "preact/hooks"
import ReactHtmlParser from "react-html-parser"
import snarkdown from "snarkdown"

import { BASE_URL } from "../../consts"
import { formatJA, strToDayjs } from "../../lib/date"
import { getToken } from "../../lib/token"
import { Content } from "../../types"

setup(h)

const Root = styled("div")({
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid black",
  "> blockquote": {
    borderLeft: "3px solid #ccc",
    paddingLeft: "5px",
    marginLeft: ".5rem"
  },
  "> a": {
    wordBreak: "break-all",
  },
})

const SubDate = styled("p")({
  color: "gray",
  fontSize: "12px",
})

const TextArea = styled("textarea")({
  width: "100%",
  minHeight: "5rem",
  height: "unset",
  resize: "none",
  border: "none",
  backgroundColor: "transparent",
  outline: "none",
})

const Button = styled("button")({
  marginLeft: "auto",
  display: "block",
  backgroundColor: "transparent",
  boxShadow: "none",
  border: "1px solid black",
  borderRadius: "5px",
})

type AddContentProps = {
  postId: string;
  contentId?: string;
  refetchFunc: (id: string) => void;
}

const ContentCard: FunctionComponent<Content> = ({ content, created_at }: Content) => {
  return (
    <Root>
      <SubDate>{formatJA(strToDayjs(created_at))}</SubDate>
      {ReactHtmlParser(snarkdown(content))}
    </Root>
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
    <Root>
      <TextArea
        rows={content.split("\n").length}
        value={content}
        onInput={e => setContent(e.currentTarget.value)}
      />
      <Button onClick={submit}>投稿</Button>
    </Root>
  )
}

export default ContentCard
