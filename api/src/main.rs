use actix_web::{get, middleware, web, App, Error, HttpResponse, HttpServer, Responder};
use diesel::{r2d2::ConnectionManager, MysqlConnection};
use r2d2::Pool;

#[get("/posts")]
async fn index(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    Ok(HttpResponse::Ok().json({}))
}

#[get("/")]
async fn aa(pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    "aaa"
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
