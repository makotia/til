use api::{crud::add_user, db::establish_connection};
use std::io::{self, Write};

fn get_input() -> String {
    let mut str = String::new();

    std::io::stdin()
        .read_line(&mut str)
        .expect("Failed to read line.");
    str.trim().to_string()
}

fn print(str: &str) {
    print!("{}", str);
    io::stdout().flush().unwrap();
}

fn main() {
    dotenv::dotenv().ok();
    let pool = establish_connection();
    let conn = pool.get().expect("err get connection");
    print("screen_name: ");
    let screen_name = get_input();
    print("password: ");
    let password = get_input();
    match add_user(conn, screen_name, password) {
        Ok(_) => println!("OK"),
        Err(why) => println!("err\n {:?}", why),
    };
}
