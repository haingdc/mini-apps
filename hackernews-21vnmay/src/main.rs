#![feature(proc_macro_hygiene, decl_macro)]
extern crate rss;

#[macro_use] extern crate rocket;
use std::collections::HashMap;

use rocket_contrib::{
  templates::Template,
  json::{Json},
};

extern crate serde;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;


mod fetch;
use fetch::*;

fn main() {
  let _result = fetch_from("https://thefullsnack.com/rss.xml");
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
    .mount("/", routes![index, json, get_articles])
    .attach(Template::fairing())
    .launch();
}

const RSS_URL: &str = "https://thefullsnack.com/rss.xml";

#[get("/")]
fn index() -> Template {
  let news = fetch_from(RSS_URL).ok().expect("Could not read RSS");
  Template::render("index", &news)
}

#[get("/json")]
fn json() -> Json<HashMap<String, String>> {
  let mut my_map = HashMap::new();
  my_map.insert(String::from("cheese"), String::from("gouda"));
  my_map.insert(String::from("bread"), String::from("rye"));
  return Json(my_map);
}

#[get("/articles")]
fn get_articles() -> Json<Vec<RSSItem>> {
  let news = fetch_from(RSS_URL).ok().expect("Could not read RSS");
  return Json(news);
}