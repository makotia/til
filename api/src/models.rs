use super::schema::posts;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Deserialize, Serialize)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Insertable, Debug, Deserialize)]
#[table_name = "posts"]
pub struct NewPost {
    pub title: String,
}
