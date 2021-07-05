#[macro_use] extern crate rocket;
use rocket::fs::NamedFile;
use rocket::tokio::time::{sleep, Duration};
use rocket::tokio::task::spawn_blocking;
use std::io;
use std::path::{Path, PathBuf};

#[launch]
fn rocket() -> _ {
	rocket::build().mount("/hello", routes![
		world,
    delay,
    serve_text_file,
    greeting,
    get_page,
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