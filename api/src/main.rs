use actix_web::{get, middleware, post, web, App, Error, HttpResponse, HttpServer};
use api::{crud, models::NewPost};
use diesel::{r2d2::ConnectionManager, MysqlConnection};
use r2d2::Pool;

#[get("/posts")]
async fn index(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let posts = web::block(move || crud::index_post(conn))
        .await
        .map_err(|e| {
            eprint!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().json(posts))
}

#[post("/posts")]
async fn aa(pool: web::Data<DbPool>, post_data: web::Json<NewPost>) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    web::block(move || crud::add_post(conn, post_data.title.clone()))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
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

    let bind: &str = "0.0.0.0:8080";
    println!("Starting server at: {}", bind);

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .service(index)
            .service(aa)
    })
    .bind(bind)?
    .run()
    .await
}
