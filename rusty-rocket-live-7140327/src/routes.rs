use rocket::http::{Cookie, private::CookieJar};
use rocket_contrib::json::Json;
use std::collections::HashMap;
use super::api_key;

#[get("/world")]
pub fn world() -> &'static str {
  "Hello, world!"
}

#[get("/")]
pub fn index() -> &'static str {
  "It's homepage aka index"
}

#[get("/<name>")]
pub fn greeting(name: String) -> String {
  format!("Hello {}", name)
}

#[get("/hello?<name>&<salutation>")]
pub fn query_greeting(name : String, salutation: Option<String>) -> String {
  match salutation {
    Some(s) => format!("{} {}", s, name),
    None => format!("Hello {}", name),
  }
}

// return json data
#[get("/json")]
pub fn json_test() -> Json<HashMap<String, String>> {
  let mut my_map = HashMap::new();
  my_map.insert(String::from("cheese"), String::from("gouda"));
  my_map.insert(String::from("bread"), String::from("rye"));
  return Json(my_map);
}

#[get("/sensitive")]
pub fn sensitive(key: api_key::ApiKey) -> &'static str {
    "Sensitive data."
}