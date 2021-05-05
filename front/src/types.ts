export type FullPost = {
  id: string,
  title: string,
  content: string,
  tags: Tag[],
  created_at: Date,
}

export type Post = {
  id: string,
  title: string,
  tags: Tag[],
  created_at: Date,
}

export type Tag = {
  id: string,
  name: string,
  icon?: string,
}
