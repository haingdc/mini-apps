#![feature(proc_macro_hygiene, decl_macro)]
extern crate rss;

#[macro_use] extern crate rocket;
use std::{collections::HashMap, net::Ipv4Addr, io, path::{PathBuf, Path}};

use rocket::{
  serde::json::Json,
  tokio::task::spawn_blocking, fs::NamedFile,
};
use rocket_dyn_templates::Template;

extern crate serde;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;


mod fetch;
use fetch::*;

#[rocket::main]
async fn main() {
  // let _result = fetch_from("https://thefullsnack.com/rss.xml");
  // if result.is_ok() {
  //   let json_data = json!({ "items": result.unwrap() });
  //   println!("{}", json_data.to_string());
  // }

  let config = rocket::Config {
    address: Ipv4Addr::new(127, 0, 0, 1).into(),
    port: 8000,
    ..rocket::Config::debug_default()
  };

  rocket::custom(&config)
    .mount("/", routes![index, blocking_task, json, get_articles])
    .mount("/public", routes![files])
    .attach(Template::fairing())
    .launch()
    .await;
}

// const RSS_URL: &str = "https://blog.rust-lang.org/feed.xml";
// const RSS_URL: &str = "https://news.ycombinator.com/rss";
const RSS_URL: &str = "https://thefullsnack.com/rss.xml";

#[get("/")]
fn index() -> Template {
  let news = fetch_from(RSS_URL).ok().expect("Could not read RSS");
  Template::render("index", &news)
}

#[get("/blocking_task")]
async fn blocking_task() -> std::io::Result<Vec<u8>> {
  let vec = spawn_blocking(|| std::fs::read("public/data.txt")).await
      .map_err(|e| io::Error::new(io::ErrorKind::Interrupted, e))??;

  Ok(vec)
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

#[get("/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
  NamedFile::open(Path::new("public/").join(file)).await.ok()
}