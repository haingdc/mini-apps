use super::rocket;
use rocket::local::Client;
use rocket::http::Status;

#[test]
fn test_index() {
  let client = Client::new(rocket()).expect("valid rocket instance");
  let mut response = client.get("/api").dispatch();
  assert_eq!(response.status(), Status::Ok);
  assert_eq!(response.body_string(), Some("It's homepage aka index".into()));
}

#[test]
fn test_world() {
  let client = Client::new(rocket()).expect("valid rocket instance");
  let mut response = client.get("/api/world").dispatch();
  assert_eq!(response.status(), Status::Ok);
  assert_eq!(response.body_string(), Some("Hello, world!".into()));
}

#[test]
fn test_greeting() {
  let client = Client::new(rocket()).unwrap();
  let mut response = client.get("/api/rainer").dispatch();
  assert_eq!(response.body_string(), Some("Hello rainer".into()));
}

#[test]
fn test_query_greeting_with_salutation() {
  let client = Client::new(rocket()).unwrap();
  let mut response = client.get("/api/hello?name=rainer&salutation=Hi").dispatch();
  assert_eq!(response.body_string(), Some("Hi rainer".into()))
}

#[test]
fn test_query_greeting_without_salutation() {
  let client = Client::new(rocket()).unwrap();
  let mut response = client.get("/api/hello?name=rainer").dispatch();
  assert_eq!(response.body_string(), Some("Hello rainer".into()))
}