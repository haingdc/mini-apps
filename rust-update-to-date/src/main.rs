extern crate serde;

fn main() {
	println!("Begin outer scrope");

	{
		println!("Begin inner scope");
		let x = DropMe;
		println!("x: {:?}", x);
	}

	println!("End outer scrope");
}

#[derive(Debug)]
struct DropMe;

impl Drop for DropMe {

	// drop is called before an instance is dropped
	fn drop(&mut self) {
		println!("Dropping!");
	}
}


