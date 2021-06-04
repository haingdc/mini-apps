use super::rocket;
use rocket::local::Client;
use rocket::http::Status;

#[test]
fn index() {
    let client = Client::new(rocket()).expect("valid rocket instance");
    let mut response = client.get("/api").dispatch();
    assert_eq!(response.status(), Status::Ok);
    assert_eq!(response.body_string(), Some("It's homepage aka index".into()));
}

#[test]
fn world() {
    let client = Client::new(rocket()).expect("valid rocket instance");
    let mut response = client.get("/api/world").dispatch();
    assert_eq!(response.status(), Status::Ok);
    assert_eq!(response.body_string(), Some("Hello, world!".into()));
}