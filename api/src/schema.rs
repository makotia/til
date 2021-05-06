table! {
    posts (id) {
        id -> Integer,
        title -> Varchar,
        created_at -> Datetime,
    }
}

table! {
    post_tags (id) {
        id -> Integer,
        tag_id -> Integer,
        post_id -> Integer,
    }
}

table! {
    tags (id) {
        id -> Integer,
        title -> Varchar,
        icon -> Nullable<Text>,
    }
}

joinable!(post_tags -> posts (post_id));
joinable!(post_tags -> tags (tag_id));

allow_tables_to_appear_in_same_query!(
    posts,
    post_tags,
    tags,
);
