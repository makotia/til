use bcrypt::{hash, DEFAULT_COST};
use diesel::{prelude::*, r2d2::ConnectionManager, MysqlConnection, QueryResult};
use r2d2::PooledConnection;

use crate::models::{Content, NewContent, NewPost, NewUser, Post, PostWithContents, User};

pub fn add_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    data: NewPost,
) -> QueryResult<Post> {
    use crate::schema::posts;
    use crate::schema::posts::dsl::*;

    conn.transaction::<_, diesel::result::Error, _>(|| {
        let inserted_user = conn
            .transaction::<_, diesel::result::Error, _>(|| {
                diesel::insert_into(posts::table)
                    .values(data)
                    .execute(&conn)?;

                posts.order(posts::id.desc()).first::<Post>(&conn)
            })
            .expect("err");

        Ok(inserted_user)
    })
}

pub fn add_content(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    post_id: i32,
    content: String,
) -> QueryResult<usize> {
    use crate::schema::contents;

    let data = NewContent { post_id, content };

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
    use crate::schema::posts;
    use crate::schema::posts::dsl::*;

    posts.order(posts::id.desc()).load::<Post>(&conn)
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

pub fn add_user(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    screen_name: String,
    password: String,
) -> QueryResult<usize> {
    use crate::schema::users;

    let hashed_password = hash(password, DEFAULT_COST).unwrap();

    let data = NewUser {
        screen_name,
        hashed_password,
    };

    diesel::insert_into(users::table)
        .values(data)
        .execute(&conn)
}

pub fn get_user(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    screen_name: String,
) -> QueryResult<User> {
    use crate::schema::users;

    let user = users::table
        .filter(users::screen_name.eq(screen_name))
        .first::<User>(&conn)
        .expect("err");
    Ok(user)
}
