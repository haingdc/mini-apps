#[macro_use] extern crate rocket;
use rocket::tokio::time::{sleep, Duration};

#[get("/delay/<seconds>")]
async fn delay(seconds: u64) -> String {
	sleep(Duration::from_secs(seconds)).await;
	format!("Waited for {} seconds", seconds)
}

#[get("/world")]
fn world() -> &'static str {
	"Hello, world!"
}

#[launch]
fn rocket() -> _ {
	rocket::build().mount("/hello", routes![
		world,
    delay,
	])
}