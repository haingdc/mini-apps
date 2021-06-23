extern crate serde;
use serde::{Serialize, Deserialize};
use bincode;

fn main() {
	let point1 = Point {x: 1.0, y: 2.0};
	let foo = point1;
	let bar = &point1;
	println!("point1 {:?}\nfoo {:?}\nbar {:?}", point1, foo, bar);
}

#[derive(Debug)]
struct DropMe;

impl Drop for DropMe {

	// drop is called before an instance is dropped
	fn drop(&mut self) {
		println!("Dropping!");
	}
}

#[derive(Serialize, Deserialize, Debug, Clone, Copy)]
struct Point {
  x: f32,
  y: f32
}

#[derive(Serialize, Deserialize, Debug)]
struct Line {
  points: Vec<Point>,
  valid: bool,
  length: f32,
  desc: String
}
