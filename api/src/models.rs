use super::schema::{contents, posts};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Deserialize, Serialize)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PostWithContents {
    pub id: i32,
    pub title: String,
    pub created_at: chrono::NaiveDateTime,
    pub contents: Vec<Content>,
}

#[derive(Insertable, Debug, Deserialize)]
#[table_name = "posts"]
pub struct NewPost {
    pub title: String,
}

#[derive(Queryable, Debug, Deserialize, Serialize)]
pub struct Content {
    pub id: i32,
    pub post_id: i32,
    pub content: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Insertable, Debug, Deserialize)]
#[table_name = "contents"]
pub struct NewContent {
    pub post_id: i32,
    pub content: String,
}
