import { FunctionComponent, h } from "preact"

type Props = {
  id: string;
}

const Index: FunctionComponent<Props> = ({ id }: Props) => {
  return (
    <div>
      <h1>Post Page</h1>
      <p>{id}</p>
    </div>
  )
}

export default Index
