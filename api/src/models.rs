use super::schema::*;
use diesel::{r2d2::ConnectionManager, MysqlConnection};
use serde::{Deserialize, Serialize};

pub type DbPool = r2d2::Pool<ConnectionManager<MysqlConnection>>;

#[derive(Queryable, Debug, Deserialize, Serialize, Identifiable)]
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

#[derive(Queryable, Debug, Deserialize, Serialize)]
pub struct User {
    pub id: i32,
    pub screen_name: String,
    pub hashed_password: String,
    pub created_at: chrono::NaiveDateTime,
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

#[derive(Debug, Clone, Deserialize)]
pub struct NewContentRequest {
    pub content: String,
}

#[derive(Insertable, Debug, Deserialize)]
#[table_name = "users"]
pub struct NewUser {
    pub screen_name: String,
    pub hashed_password: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct LoginUser {
    pub screen_name: String,
    pub password: String,
}

#[derive(Serialize, Debug)]
pub struct AuthData {
    pub token: String,
}
