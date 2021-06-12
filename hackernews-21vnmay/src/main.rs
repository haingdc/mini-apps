extern crate rss;
extern crate serde;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;

mod fetch;
use fetch::*;

fn main() {
  let result = fetch_from("https://thefullsnack.com/rss.xml");
  if result.is_ok() {
    println!("Yay! It's worked!");
  }
}