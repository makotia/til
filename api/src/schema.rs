table! {
    contents (id) {
        id -> Integer,
        post_id -> Integer,
        content -> Text,
        created_at -> Timestamp,
    }
}

table! {
    posts (id) {
        id -> Integer,
        title -> Varchar,
        created_at -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Integer,
        screen_name -> Text,
        hashed_password -> Text,
        created_at -> Timestamp,
    }
}

joinable!(contents -> posts (post_id));

allow_tables_to_appear_in_same_query!(
    contents,
    posts,
    users,
);
