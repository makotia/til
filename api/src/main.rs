use actix_cors::Cors;
use actix_web::{
    dev::ServiceRequest,
    error::ErrorUnauthorized,
    http::{header, Method},
    middleware, web, App, Error, HttpServer,
};
use actix_web_httpauth::{extractors::bearer::BearerAuth, middleware::HttpAuthentication};
use api::{handler, jwt::decode_jwt};
use diesel::{r2d2::ConnectionManager, MysqlConnection};
use r2d2::Pool;

async fn ok_validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, Error> {
    match decode_jwt(credentials.token()) {
        Ok(_) => Ok(req),
        Err(err) => Err(ErrorUnauthorized(err)),
    }
}

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
            .route("/login", web::post().to(handler::login_user))
            .route("/posts", web::get().to(handler::index_post))
            .route("/posts/{id}", web::get().to(handler::get_post))
            .service(
                web::scope("/")
                    .wrap(HttpAuthentication::bearer(ok_validator))
                    .route("/posts/{id}", web::put().to(handler::update_post))
                    .route(
                        "/posts/{id}/contents/{content_id}",
                        web::put().to(handler::update_content),
                    )
                    .route("/posts", web::post().to(handler::create_post))
                    .route(
                        "/posts/{id}/contents",
                        web::post().to(handler::create_content),
                    )
                    .route("/posts/{id}", web::delete().to(handler::delete_post))
                    .route(
                        "/posts/{id}/contents/{content_id}",
                        web::delete().to(handler::delete_content),
                    ),
            )
    })
    .bind(bind)?
    .run()
    .await
}
