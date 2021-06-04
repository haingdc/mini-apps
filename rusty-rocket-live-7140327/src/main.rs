#![feature(proc_macro_hygiene, decl_macro)]

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
    routes::sensitive,
  ])
}


fn main() {
  rocket().launch();
}
