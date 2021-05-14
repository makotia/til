use actix_cors::Cors;
use actix_web::{
    delete,
    error::BlockingError,
    get,
    http::{header, Method},
    middleware, post, put, web, App, Error, HttpResponse, HttpServer,
};
use api::{
    crud,
    models::{NewContent, NewPost},
};
use diesel::{r2d2::ConnectionManager, MysqlConnection};
use r2d2::Pool;

#[get("/posts")]
async fn index_post(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let posts = web::block(move || crud::index_post(conn))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().json(posts))
}

#[get("/posts/{id}")]
async fn get_post(
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

#[put("/posts/{id}")]
async fn update_post(
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

#[put("/posts/{id}/contents/{content_id}")]
async fn update_content(
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

#[post("/posts")]
async fn create_post(
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

#[post("/posts/{id}/contents")]
async fn create_content(
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

#[delete("/posts/{id}")]
async fn delete_post(
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

#[delete("/posts/{id}/contents/{content_id}")]
async fn delete_content(
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

type DbPool = r2d2::Pool<ConnectionManager<MysqlConnection>>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    dotenv::dotenv().ok();

    let connspec: String = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager: ConnectionManager<MysqlConnection> =
        ConnectionManager::<MysqlConnection>::new(connspec);
    let pool: Pool<ConnectionManager<MysqlConnection>> = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let bind: &str = "0.0.0.0:8000";
    println!("Starting server at: {}", bind);

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin_fn(|_, _req_head| true)
            .allowed_methods(vec![
                Method::GET,
                Method::POST,
                Method::PUT,
                Method::DELETE,
                Method::OPTIONS,
            ])
            .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            .allowed_header(header::CONTENT_TYPE)
            .supports_credentials()
            .max_age(3600);

        App::new()
            .data(pool.clone())
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .service(index_post)
            .service(get_post)
            .service(update_post)
            .service(create_post)
            .service(delete_post)
            .service(create_content)
            .service(update_content)
            .service(delete_content)
    })
    .bind(bind)?
    .run()
    .await
}
