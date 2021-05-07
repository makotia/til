use diesel::{prelude::*, r2d2::ConnectionManager, MysqlConnection, QueryResult};
use r2d2::PooledConnection;

use crate::models::{NewPost, Post};

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

pub fn get_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    post_id: i32,
) -> QueryResult<Post> {
    use crate::schema::posts::dsl::*;

    posts.filter(id.eq(post_id)).first::<Post>(&conn)
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

pub fn delete_post(
    conn: PooledConnection<ConnectionManager<MysqlConnection>>,
    post_id: i32,
) -> QueryResult<usize> {
    use crate::schema::posts::dsl::*;

    diesel::delete(posts.filter(id.eq(post_id))).execute(&conn)
}
