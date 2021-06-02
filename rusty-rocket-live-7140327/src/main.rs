#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/world")]
fn world() -> &'static str {
  "Hello, world!"
}

#[get("/")]
fn hello_world() -> &'static str {
  "Hello, world! from root"
}

#[get("/<name>")]
fn greeting(name: String) -> String {
  format!("Hello {}", name)
}

#[get("/hello?<name>&<salutation>")]
fn query_greeting(name : String, salutation: Option<String>) -> String {
  match salutation {
    Some(s) => format!("{} {}", s, name),
    None => format!("Hello {}", name),
  }
}

fn main() {
  // rocket::ignite().mount("/api", routes![world]).launch();
  let cfg = rocket::config::Config::build(rocket::config::Environment::Development)
        .address("127.0.0.1")
        .port(8000)
        .extra("template_dir",  "web/templates")
        .unwrap();

  rocket::custom(cfg).mount("/api", routes![
    world,
    hello_world,
    query_greeting,
    greeting,
  ]).launch();
}