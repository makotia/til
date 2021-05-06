-- Your SQL goes here
CREATE TABLE posts (
  id int not null auto_increment,
  title varchar(100) not null,
  created_at datetime not null default current_timestamp,
  primary key (id)
) ENGINE=InnoDB;
