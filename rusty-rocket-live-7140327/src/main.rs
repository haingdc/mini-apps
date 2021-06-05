#![feature(proc_macro_hygiene, decl_macro)]
use serde::{Serialize, Deserialize};
use std::sync::atomic::{AtomicUsize};
use std::sync::RwLock;
use std::collections::HashMap;

// IMPORT ROCKET LIBRARY
#[macro_use] extern crate rocket;


pub mod api_key;
pub mod routes;

#[cfg(test)] mod tests;

fn rocket() -> rocket::Rocket {
  let cfg = rocket::config::Config::build(rocket::config::Environment::Development)
        .address("127.0.0.1")
        .port(8000)
        .extra("template_dir",  "web/templates")
        .unwrap();

  rocket::custom(cfg).mount("/api", routes![
    routes::index,
    routes::world,
    routes::query_greeting,
    routes::greeting,
    routes::json_test,
    routes::protected,
    routes::login,
    routes::session,
    routes::sensitive,
    routes::add_hero,
    routes::get_all,
    routes::get_hero,
  ])
  // Add managed state. Here we use global state. Request-local state
  // would also be possible.
  //    (see https://rocket.rs/v0.4/guide/state/)
    .manage(RwLock::new(HashMap::<ID, Hero>::new()))
    .manage(HeroCount(AtomicUsize::new(1)))
}


fn main() {
  rocket().launch();
}

// region Simple REST API
type ID = usize;

/* Rocket uses Serde for serializing/deserializing data. */

#[derive(Serialize, Debug, Clone)]
pub struct Hero {
    id: ID,
    name: String,
    #[serde(rename(serialize = "canFly"))]
    can_fly: bool,
}

#[derive(Deserialize, Debug)]
pub struct NewHero {
    name: String,
    #[serde(rename(deserialize = "canFly"))]
    can_fly: bool,
}

// We use a `RwLock`-protected `HashMap` instead of a DB. Note that Rocket has
// built-in support for databases, but this is out-of-scope of this demo.
//    (see https://rocket.rs/v0.4/guide/state/#databases for DB support)
pub struct HeroCount(AtomicUsize);
pub type HeroesMap = RwLock<HashMap<ID, Hero>>;
