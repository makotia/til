use diesel::{prelude::*, r2d2::ConnectionManager, MysqlConnection, QueryResult};
use r2d2::PooledConnection;

use crate::models::{Content, NewContent, NewPost, Post, PostWithContents};

pub fn add_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    title: String,
) -> QueryResult<usize> {
    use crate::schema::posts;

    let data = NewPost { title: title };

    diesel::insert_into(posts::table)
        .values(data)
        .execute(&conn)
}

pub fn add_content(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    content_body: String,
    post_id: i32,
) -> QueryResult<usize> {
    use crate::schema::contents;

    let data = NewContent {
        post_id: post_id,
        content: content_body,
    };

    diesel::insert_into(contents::table)
        .values(data)
        .execute(&conn)
}

pub fn get_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    post_id: i32,
) -> QueryResult<PostWithContents> {
    use crate::schema::{contents, posts};

    let post = posts::table
        .filter(posts::id.eq(post_id))
        .first::<Post>(&conn)
        .expect("err");

    let contents_data = contents::table
        .filter(contents::post_id.eq(post_id))
        .get_results::<Content>(&conn)
        .expect("err");

    let return_data = PostWithContents {
        id: post.id,
        title: post.title,
        created_at: post.created_at,
        contents: contents_data,
    };

    Ok(return_data)
}

pub fn index_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
) -> QueryResult<Vec<Post>> {
    use crate::schema::posts::dsl::*;

    posts.load::<Post>(&conn)
}

pub fn update_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    post_id: i32,
    post_title: String,
) -> QueryResult<usize> {
    use crate::schema::posts::dsl::*;
    diesel::update(posts.filter(id.eq(post_id)))
        .set(title.eq(post_title))
        .execute(&conn)
}

pub fn update_content(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    content_id: i32,
    content_body: String,
) -> QueryResult<usize> {
    use crate::schema::contents::dsl::*;
    diesel::update(contents.filter(id.eq(content_id)))
        .set(content.eq(content_body))
        .execute(&conn)
}

pub fn delete_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    post_id: i32,
) -> QueryResult<usize> {
    use crate::schema::posts::dsl::*;

    diesel::delete(posts.filter(id.eq(post_id))).execute(&conn)
}

pub fn delete_content(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    content_id: i32,
) -> QueryResult<usize> {
    use crate::schema::contents::dsl::*;

    diesel::delete(contents.filter(id.eq(content_id))).execute(&conn)
}
