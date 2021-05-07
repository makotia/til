-- Your SQL goes here
CREATE TABLE contents (
  id int not null auto_increment,
  post_id int not null,
  content text not null,
  created_at timestamp not null default current_timestamp,
  foreign key (post_id) references posts(id),
  primary key (id)
) Engine=InnoDB;
