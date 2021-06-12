use diesel::{r2d2::ConnectionManager, MysqlConnection};
use r2d2::Pool;

pub fn establish_connection() -> Pool<ConnectionManager<MysqlConnection>> {
    let connspec: String = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager: ConnectionManager<MysqlConnection> =
        ConnectionManager::<MysqlConnection>::new(connspec);
    let pool: Pool<ConnectionManager<MysqlConnection>> = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    pool
}
