-- Your SQL goes here
CREATE TABLE post_tags (
  id int not null auto_increment,
  tag_id int not null,
  post_id int not null,
  primary key (id),
  constraint fk_tag_id foreign key (tag_id) references tags (id),
  constraint fk_post_id foreign key (post_id) references posts (id)
) ENGINE=InnoDB;
