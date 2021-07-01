extern crate serde;
use serde::{Serialize, Deserialize};
use bincode;

fn main() {
	let string = "🦀";
	let length = byte_length(string);

	println!("Bytes in \"{}\": {}", string, length);
}

fn byte_length(string: &str) -> usize {
	string.bytes().len()
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

#[derive(Debug)]
struct Person {
	age: i8
}

fn pass_number_by_reference(number: &i8) -> bool {
	number.is_negative()
}

fn pass_number_by_value(number: i8) -> bool {
	number.is_negative()
}

fn pass_vec_by_reference(vec: &Vec<i8>) -> bool {
	vec.is_empty()
}