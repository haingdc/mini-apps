extern crate image;

use image::{GenericImageView};

fn main() {
  let img = image::open("brian jackson.jpg").unwrap();
  let (width, height) = img.dimensions();
  println!("dimensions ({}, {})", width, height);

  println!("{:?}", img.color());

  img.save("test.png").unwrap();
}
