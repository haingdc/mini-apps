fn main() {
    let returned_data = some_function(2.2, 50);
    println!("returned_data is {}", returned_data);
}

fn some_procedure(param_a: f32, param_b: i8) {
    println!("Im in some_procedure witha {} a {}", param_a, param_b);
}

fn some_function(param_a:f32, param_b: i128) -> f32 {
    10.1
}
