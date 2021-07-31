use chrono::{DateTime, Duration, Utc};
use jsonwebtoken::{
    decode, encode, Algorithm, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    screen_name: String,
    iat: i64,
    exp: i64,
}

pub fn make_jwt(screen_name: &str) -> (String, DateTime<Utc>) {
    let secret = std::env::var("JWT_SECRET").expect("secret is not set");
    let header = Header {
        typ: Some("JWT".to_string()),
        alg: Algorithm::HS256,
        ..Default::default()
    };
    let now = Utc::now();
    let exp = now + Duration::hours(24);
    let my_claims = Claims {
        screen_name: screen_name.to_string(),
        iat: now.timestamp(),
        exp: exp.timestamp(),
    };

    let token = encode(
        &header,
        &my_claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .unwrap();

    (token, exp)
}

pub fn decode_jwt(jwt: &str) -> Result<TokenData<Claims>, jsonwebtoken::errors::Error> {
    let secret = std::env::var("JWT_SECRET").expect("secret is not set");
    decode::<Claims>(
        jwt,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )
}
