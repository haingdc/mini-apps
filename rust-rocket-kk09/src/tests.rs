use rocket::local::blocking::Client;
use rocket::http::{RawStr, Status};
use super::*;

#[test]
fn hello() {
	let langs = &["", "ru", "%D1%80%D1%83", "en", "unknown"];
	let ex_lang = &["Hey", "Привет", "Привет", "Hello", "Hey"];

	let emojis = &["", "on", "true", "false", "no", "yes", "off"];
	let ex_emoji = &["", "👋 ", "👋 ", "", "", "👋 ", ""];

	let names = &["", "Bob", "Bob+Smith"];
	let ex_name = &["!", ", Bob!", ", Bob Smith!"];

	let client = Client::tracked(super::rocket()).unwrap();
	for n in 0..(langs.len() * emojis.len() * names.len()) {
		let i = n / (emojis.len() * names.len());
		let j = n % (emojis.len() * names.len()) / names.len();
		let k = n % (emojis.len() * names.len()) % names.len();

		let (lang , ex_lang ) = (  langs[i],  ex_lang[i] );
		let (emoji, ex_emoji) = ( emojis[j], ex_emoji[j] );
		let (name , ex_name ) = (  names[k],  ex_name[k] );
		let expected = format!("{}{}{}", ex_emoji, ex_lang, ex_name);

		let q = |name, s: &str| match s.is_empty() {
				true => "".into(),
				false => format!("&{}={}", name, s)
		};

		let uri = format!("/?{}{}{}", q("lang", lang), q("emoji", emoji), q("name", name));
		let response = client.get(uri).dispatch();
		assert_eq!(response.into_string().unwrap(), expected);

		let uri = format!("/?{}{}{}", q("emoji", emoji), q("name", name), q("lang", lang));
		let response = client.get(uri).dispatch();
		assert_eq!(response.into_string().unwrap(), expected);
	}
}
