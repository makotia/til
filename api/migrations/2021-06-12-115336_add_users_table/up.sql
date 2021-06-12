-- Your SQL goes here
CREATE TABLE users (
  id int not null auto_increment,
  screen_name text not null,
  hashed_password text not null,
  created_at timestamp not null default current_timestamp,
  primary key (id)
) Engine=InnoDB;
