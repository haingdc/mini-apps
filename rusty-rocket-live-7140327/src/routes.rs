use rocket::{
  http::{Cookie, Cookies},
  response::status::Created,
  State,
};
use std::collections::HashMap;
use std::sync::atomic::{Ordering};

use rocket_contrib::{
  json::{Json},
};
use super::{api_key, Hero, NewHero, HeroesMap, HeroCount,ID};

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

// Rocket processes body data based on argument types. Here we deserialize
// (`Deserialize` trait from Serde) a `NewHero` into the `hero` argument.
//    (see https://rocket.rs/v0.4/guide/requests/#json)
// Note that we return `Created`. It is a wrapping responder that changes the
// HTTP status code to 201 (created) and responds with the inner responder
// (in this case JSON).
//    (see https://rocket.rs/v0.4/guide/responses/#wrapping)
#[post("/heroes", format = "json", data = "<hero>")]
pub fn add_hero(
    hero: Json<NewHero>,
    heroes_state: State<'_, HeroesMap>,
    hero_count: State<'_, HeroCount>,
) -> Created<Json<Hero>> {
    // Generate unique hero ID
    let hid = hero_count.0.fetch_add(1, Ordering::Relaxed);

    // Build new hero
    let new_hero = Hero {
        id: hid,
        name: hero.0.name,
        can_fly: hero.0.can_fly,
    };

    // Insert new hero in hashmap
    let mut heroes = heroes_state.write().unwrap();
    heroes.insert(hid, new_hero.clone());

    // Use uri macro to generate location header
    //    (see https://rocket.rs/v0.4/guide/responses/#typed-uris)
    let location = uri!("/api", get_hero: hid);
    println!("location {}", location.to_string());
    Created(location.to_string(), Some(Json(new_hero)))
}

// Note that we return `Option`. `None` would result in 404 (not found).
#[get("/heroes/<id>")]
pub fn get_hero(id: ID, heroes_state: State<'_, HeroesMap>) -> Option<Json<Hero>> {
    let heroes = heroes_state.read().unwrap();
    heroes.get(&id).map(|h| Json(h.clone()))
}

#[get("/heroes")]
pub fn get_all(heroes_state: State<'_, HeroesMap>) -> Json<Vec<Hero>> {
    let heroes = heroes_state.read().unwrap();
    Json(heroes.values().map(|v| v.clone()).collect())
}