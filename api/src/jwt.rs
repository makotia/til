use chrono::{Duration, Utc};
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

pub fn make_jwt(screen_name: &String) -> String {
    let secret = std::env::var("JWT_SECRET").expect("secret is not set");
    let mut header = Header::default();
    header.typ = Some("JWT".to_string());
    header.alg = Algorithm::HS256;
    let now = Utc::now();
    let iat = now.timestamp();
    let exp = (now + Duration::hours(24)).timestamp();
    let my_claims = Claims {
        screen_name: screen_name.clone(),
        iat: iat,
        exp: exp,
    };

    encode(
        &header,
        &my_claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .unwrap()
}

pub fn decode_jwt(jwt: &str) -> Result<TokenData<Claims>, jsonwebtoken::errors::Error> {
    let secret = std::env::var("JWT_SECRET").expect("secret is not set");
    decode::<Claims>(
        jwt,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )
}
