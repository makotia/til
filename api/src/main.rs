use actix_web::{get, middleware, web, App, HttpServer, Responder};
use diesel::{r2d2::ConnectionManager, MysqlConnection};

#[get("/{id}/{name}")]
async fn index(
    pool: web::Data<DbPool>,
    web::Path((id, name)): web::Path<(u32, String)>,
) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    format!("Hello {}! id:{}", name, id)
}

type DbPool = r2d2::Pool<ConnectionManager<MysqlConnection>>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    dotenv::dotenv().ok();

    let connspec = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager = ConnectionManager::<MysqlConnection>::new(connspec);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let bind = "0.0.0.0:8080";
    println!("Starting server at: {}", bind);

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .service(index)
    })
    .bind(bind)?
    .run()
    .await
}
