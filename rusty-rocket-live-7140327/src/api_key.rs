use base64;
use rocket::{http::Status, request, request::FromRequest, request::Outcome, Request};
use std::str;

// Implement a custom request guard checking for the existance of an API key in request header
// More about request guards at https://rocket.rs/v0.4/guide/requests/#request-guards

#[derive(Debug)]
pub struct ApiKey(pub String);

/// Returns true if `key` is a valid API key string.
fn is_valid(key: &str) -> bool {
  println!("result {} vs {}", "valid_api_key", key);
  key == "\"valid_api_key\""
}

#[derive(Debug)]
pub enum ApiKeyError {
    BadCount,
    Missing,
    Invalid,
}

impl<'a, 'r> FromRequest<'a, 'r> for ApiKey {
  type Error = ApiKeyError;

  fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
      let keys: Vec<_> = request.headers().get("x-api-key").collect();
      match keys.len() {
          0 => Outcome::Failure((Status::BadRequest, ApiKeyError::Missing)),
          1 if is_valid(keys[0]) => Outcome::Success(ApiKey(keys[0].to_string())),
          1 => Outcome::Failure((Status::BadRequest, ApiKeyError::Invalid)),
          _ => Outcome::Failure((Status::BadRequest, ApiKeyError::BadCount)),
      }
  }
}