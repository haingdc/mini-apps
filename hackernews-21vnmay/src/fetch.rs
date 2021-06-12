use super::rss;
use rss::{Channel, Item};

pub type FetchResult<T> = Result<T, rss::Error>;

pub fn fetch_from(url: &str) -> FetchResult<Vec<RSSItem>> {
  Ok(Channel::from_url(url)?
              .items()
              .into_iter()
              .map(|item| RSSItem::from(item.clone()))
              .collect())
}


#[derive(Serialize)]
pub struct RSSItem {
    pub title: String,
    pub link: String,
    pub description: String,
    pub pub_date: String,
}

impl From<Item> for RSSItem {
  fn from(item: Item) -> Self {
      RSSItem {
          title: item.title().unwrap_or_default().to_owned(),
          link: item.link().unwrap_or_default().to_owned(),
          description: item.description().unwrap_or_default().to_owned(),
          pub_date: item.pub_date().unwrap_or_default().to_owned(),
      }
  }
}



// ##### unit test

#[test]
fn test_fetch_from_valid_url() {
  let result = fetch_from("https://thefullsnack.com/rss.xml");
  assert!(result.is_ok());
  assert!(result.unwrap().len() > 0);
}

#[test]
fn test_fetch_from_invalid_url() {
  let result = fetch_from("https://where-superman-meet-wonderwoman.com/and-they-got-married.xml");
  assert!(result.is_err());
}

#[test]
fn test_fetch_from_invalid_rss_url() {
  let result = fetch_from("https://xkcd.com/info.0.json");
  assert!(result.is_err());
}

#[test]
fn test_fetch_is_convertable_to_json() {
    let items = fetch_from("https://thefullsnack.com/rss.xml");
    assert!(items.is_ok());
    let json_data = json!({ "items": items.unwrap() });
    assert!(json_data["items"].is_array());
    assert!(json_data["items"][0].is_object());
    assert!(json_data["items"][0]["title"].is_string());
    assert_eq!(json_data["items"][0]["title"].as_str(), Some("Paper Review: What do Sketches say about Thinking".into()));  // I assume that 1st item is like below
}

// <item>
//   <title>Paper Review: What do Sketches say about Thinking</title>
//   <link>
//     https://thefullsnack.com/posts/sketching-thinking.html
//   </link>
//   <description>
//     "Có một sự liên quan không hề nhỏ giữa quá trình sketching và quá trình suy nghĩ, tư duy..."
//   </description>
//   <guid>
//     https://thefullsnack.com/posts/sketching-thinking.html
//   </guid>
//   <pubDate>Mon, 24 Jun 2019 00:06:32 +0000</pubDate>
// </item>