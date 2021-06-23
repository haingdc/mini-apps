extern crate serde;
use serde::{Serialize, Deserialize};
use bincode;

fn main() {
	let v = vec![1,2,3];
	let v_ref = &v;
	let s = sum(v_ref);
	println!("sum of {:?}: {}", v_ref, s);
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

fn sum(vector: &Vec<i32>) -> i32 {
	let mut sum = 0;
	for item in vector {
		sum = sum + item;
	}
	sum
}