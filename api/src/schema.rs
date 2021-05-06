table! {
    posts (id) {
        id -> Integer,
        title -> Varchar,
        created_at -> Datetime,
    }
}

table! {
    tags (id) {
        id -> Integer,
        title -> Varchar,
        icon -> Nullable<Text>,
    }
}

allow_tables_to_appear_in_same_query!(
    posts,
    tags,
);
