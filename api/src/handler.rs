use actix_web::{error::BlockingError, web, Error, HttpResponse};

use crate::{
    crud,
    models::{DbPool, NewContent, NewPost},
};

pub async fn index_post(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let posts = web::block(move || crud::index_post(conn))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().json(posts))
}

pub async fn get_post(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let post = web::block(move || crud::get_post(conn, id))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            match e {
                BlockingError::Error(diesel::NotFound) => HttpResponse::NotFound().finish(),
                _ => HttpResponse::InternalServerError().finish(),
            }
        })?;

    Ok(HttpResponse::Ok().json(post))
}

pub async fn update_post(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
    post_data: web::Json<NewPost>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    web::block(move || crud::update_post(conn, id, post_data.title.clone()))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().finish())
}

pub async fn update_content(
    pool: web::Data<DbPool>,
    web::Path((_, content_id)): web::Path<(i32, i32)>,
    post_data: web::Json<NewContent>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    web::block(move || crud::update_content(conn, content_id, post_data.content.clone()))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().finish())
}

pub async fn create_post(
    pool: web::Data<DbPool>,
    post_data: web::Json<NewPost>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    web::block(move || crud::add_post(conn, post_data.title.clone()))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;
    Ok(HttpResponse::Ok().finish())
}

pub async fn create_content(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
    post_data: web::Json<NewContent>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    web::block(move || crud::add_content(conn, post_data.content.clone(), id))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;
    Ok(HttpResponse::Ok().finish())
}

pub async fn delete_post(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    web::block(move || crud::delete_post(conn, id))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().finish())
}

pub async fn delete_content(
    pool: web::Data<DbPool>,
    web::Path((_, content_id)): web::Path<(i32, i32)>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    web::block(move || crud::delete_content(conn, content_id))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().finish())
}
