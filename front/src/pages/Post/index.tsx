import { FunctionComponent, h } from "preact"

type Props = {
  id: string;
}

const Index: FunctionComponent<Props> = ({ id }: Props) => {
  return (
    <div
      style={{
        font: "14px/1.21 'Helvetica Neue', arial, sans-serif",
        fontWeight: 400,
      }}
    >
      <h1>Post Page</h1>
      <p>{id}</p>
    </div>
  )
}

export default Index
