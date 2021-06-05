use rocket::http::{Cookie, Cookies};
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


// native route guard

#[get("/login")]
pub fn login(mut cookies: Cookies) {
  cookies.add(Cookie::new("Session", base64::encode("this_is_a_session_key")));
}

#[get("/session")]
pub fn session(cookies: Cookies) -> &'static str {
  match cookies.get("Session") {
    Some(_) => "you got the cookie!",
    None => "Sorry, no cookie!",
  }
}

// custom route guards

#[get("/protected")]
pub fn protected(key: api_key::ApiKey) -> String {
  format!("You are allowed to access this API because you presented key '{}'", key.0)
}

#[get("/sensitive")]
pub fn sensitive(_key: api_key::Sensitive) -> &'static str {
    "Sensitive data."
}
