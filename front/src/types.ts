export type Content = {
  id: string,
  content: string,
  created_at: string,
}

export type Post = {
  id: string,
  title: string,
  created_at: string,
  contents?: Content[],
}
