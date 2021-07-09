#[macro_use] extern crate rocket;
use rocket::fs::NamedFile;
use rocket::response::Redirect;
use rocket::tokio::time::{sleep, Duration};
use rocket::tokio::task::spawn_blocking;
use std::io;
use std::path::{Path, PathBuf};

mod utils;

#[cfg(test)] mod tests;

#[derive(FromFormField)]
enum Lang {
  #[field(value = "en")]
  English,
  #[field(value = "ru")]
  #[field(value = "ру")] // not US keyboard
  Russian
}

#[derive(FromForm)]
struct Options<'r> {
  emoji: bool,
  name : Option<&'r str>,
}

#[launch]
fn rocket() -> _ {
	rocket::build()
    .mount("/", routes![
      hello,
      search,
    ])
    .mount("/hello", routes![
      hello,
      world,
      user,
      user_int,
      user_str,
      delay,
      serve_text_file,
      greeting,
      get_page,
      foo_bar,
      everything,
    ])
}

#[get("/delay/<seconds>")]
async fn delay(seconds: u64) -> String {
	sleep(Duration::from_secs(seconds)).await;
	format!("Waited for {} seconds", seconds)
}

#[get("/world")]
fn world() -> &'static str {
	"Hello, world!"
}

#[get("/serve_text_file")]
async fn serve_text_file() -> io::Result<Vec<u8>> {
  let vec = spawn_blocking(|| std::fs::read("static/data.txt")).await
    .map_err(|e| io::Error::new(io::ErrorKind::Interrupted, e))??;

  Ok(vec)
}

#[get("/greeting/<name>/<age>/<cool>")]
fn greeting(name: &str, age: u8, cool: bool) -> String {
  if cool {
    format!("You're a cool {} year old, {}!", age, name)
  } else {
    format!("{}, we need to talk about your coolness.", name)
  }
}

#[get("/page/<file..>")]
async fn get_page(file: PathBuf) -> Option<NamedFile> {
  NamedFile::open(Path::new("static/").join(file)).await.ok()
}

#[get("/foo/<_>/bar")]
fn foo_bar() -> &'static str {
    "Foo _____ bar!"
}

#[get("/<_..>")]
fn everything() -> &'static str {
    "Hey, you're here."
}

#[get("/user/<id>")]
fn user(id: usize) -> String {
  format!("id {} is usize", id)
}

#[get("/user/<id>", rank = 2)]
fn user_int(id: isize) -> String {
  format!("id {} is isize", id)
}

#[get("/user/<id>", rank = 3)]
fn user_str(id: &str) -> String {
  format!("id {} is string", id)
}

#[get("/?<lang>&<opt..>")]
fn hello(lang: Option<Lang>, opt: Options<'_>) -> String {
  let mut greeting = String::new();

  if opt.emoji {
    greeting.push_str("👋 ");
  }

  match lang {
    Some(Lang::Russian) => greeting.push_str("Привет"),
    Some(Lang::English) => greeting.push_str("Hello"),
    None                => greeting.push_str("Hey"),
  }

  if let Some(name) = opt.name {
    greeting.push_str(", ");
    greeting.push_str(name);
  }

  greeting.push('!');
  greeting
}

#[get("/search?<cmd>")]
fn search(cmd: String) -> Redirect {
  println!("You typed inn: {}", cmd);
  let command = utils::get_command_from_query_string(&cmd);
  let redirect_url = match command {
    "tw" => String::from("https://twitter.com"),
      _  => utils::google::construct_google_search_url(&cmd),
  };

  Redirect::to(redirect_url)
}

