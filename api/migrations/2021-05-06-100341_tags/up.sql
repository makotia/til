-- Your SQL goes here
CREATE TABLE tags (
  id int not null auto_increment,
  title varchar(20) not null,
  icon text,
  primary key (id)
) ENGINE=InnoDB;
