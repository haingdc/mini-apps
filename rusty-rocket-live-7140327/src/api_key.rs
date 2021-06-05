use base64;
use rocket::{http::Status, request, request::FromRequest, request::Outcome, Request};
use std::str;

// Implement a custom request guard checking for the existance of an API key in request header
// More about request guards at https://rocket.rs/v0.4/guide/requests/#request-guards

#[derive(Debug)]
pub struct ApiKey(pub String);

#[derive(Debug)]
pub enum ApiKeyError {
    MissingKey,
    InvalidKey,
}

// We have to implement `FromRequest` trait for `ApiKey`
//    (see also https://api.rocket.rs/v0.4/rocket/request/trait.FromRequest.html)
impl<'a, 'r> FromRequest<'a, 'r> for ApiKey {
  type Error = ApiKeyError;

  fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
    // Check if API key is present in header
    match request.headers().get_one("x-api-key") {
      // Try to decode base64 API key
      Some(s) => match base64::decode(s) {
        // We do not really check key here. If it is valid base64, we are ok with it.
        Ok(decoded_key) => Outcome::Success(ApiKey(str::from_utf8(&decoded_key).unwrap().to_owned())),
        Err(_) => Outcome::Failure((Status::Unauthorized, ApiKeyError::InvalidKey)),
      },
      None => Outcome::Failure((Status::Unauthorized, ApiKeyError::MissingKey)),
    }
  }
}

/// Returns true if `key` is a valid API key string.
fn is_valid(key: &str) -> bool {
  key == "\"valid_api_key\""
}

pub struct Sensitive(pub String);

#[derive(Debug)]
pub enum LoginKeyError {
  Missing,
  Invalid,
  BadCount,
}

impl<'a, 'r> FromRequest<'a, 'r> for Sensitive {
  type Error = LoginKeyError;

  fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
      let keys: Vec<_> = request.headers().get("x-api-key").collect();
      match keys.len() {
          0 => Outcome::Failure((Status::BadRequest, LoginKeyError::Missing)),
          1 if is_valid(keys[0]) => Outcome::Success(Sensitive(keys[0].to_string())),
          1 => Outcome::Failure((Status::BadRequest, LoginKeyError::Invalid)),
          _ => Outcome::Failure((Status::BadRequest, LoginKeyError::BadCount)),
      }
  }
}