#![feature(proc_macro_hygiene, decl_macro)]
extern crate rss;

#[macro_use] extern crate rocket;
use rocket_contrib::templates::Template;

extern crate serde;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;


mod fetch;
use fetch::*;

fn main() {
  let result = fetch_from("https://thefullsnack.com/rss.xml");
  // if result.is_ok() {
  //   let json_data = json!({ "items": result.unwrap() });
  //   println!("{}", json_data.to_string());
  // }

  let cfg = rocket::config::Config::build(rocket::config::Environment::Development)
        .address("127.0.0.1")
        .port(3000)
        // .extra("template_dir",  "web/templates")
        .unwrap();
  rocket::custom(cfg)
    .mount("/", routes![index])
    .attach(Template::fairing())
    .launch();
}

const RSS_URL: &str = "https://news.ycombinator.com/rss";

#[get("/")]
fn index() -> Template {
  let news = fetch_from(RSS_URL).ok().expect("Could not read RSS");
  Template::render("index", &news)
}