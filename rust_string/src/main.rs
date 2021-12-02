








































fn main() {
    let example_str: &str = "Howdy";
    let example_string: String = String::from("Partner");

    let string_from_str: String = example_str.to_string();

    let string_from_hardcoded = String::from("Some hardcoded");
    let strinng_from_str_var = String::from(example_str);
    let combine_string_literals = ["first", "second"].concat();

    let str_from_string: &str = &example_string;
    let combine_with_format_macro = format!("{} {}", "first", "second");
    let string_plus_str = example_string + example_str;

    let mut mut_string = String::new();
    mut_string.push_str(example_str);
    mut_string.push_str("Some hardcoded literal");
    mut_string.push('h');

    let a = String::from("a");
    let b = String::from("b");
    let combined = a + &b + &mut_string;

    let str_from_substring: &str = &example_str[0..2];

    let char_by_index = &example_str.chars().nth(1);

    match char_by_index {
        Some(c) => println!("Found c char {}", c),
        None => {}
    }

    if let Some(c) = example_str.chars().nth(2) {
        println!("Found a charc {}", c);
    }
}
