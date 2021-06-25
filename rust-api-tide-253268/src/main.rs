use async_std::stream::StreamExt;
use dotenv::dotenv;
use mongodb::bson::doc;
use serde::{Deserialize, Serialize};
use std::env;
use tide::{Body, Request, Response, StatusCode};

#[async_std::main]
async fn main() -> tide::Result<()> {
  dotenv().ok();

  let mongodb_client_options = mongodb::options::ClientOptions::parse(&env::var("MONGODB_URI").unwrap()).await?;

  let mongodb_client = mongodb::Client::with_options(mongodb_client_options)?;

  let db = mongodb_client.database("rust-api-example");

  let state = State { db };

  let mut app = tide::with_state(state);

  app.at("/hello").get(hello);
  app.at("/items").get(get_items);
  app.at("/items").post(post_item);

  app.listen("127.0.0.1:8080").await?;

  Ok(())
}

#[derive(Clone, Debug)]
struct State {
  db: mongodb::Database,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Item {
  pub name : String,
  pub price: f32,
}

async fn post_item(mut req: Request<State>) -> tide::Result {
  // Read the request's body and transform it into a struct
  let item = req.body_json::<Item>().await?;

  // Recover the database connection handle from the Tide state
  let db = &req.state().db;

  // Get a handle to the "items" collection
  let items_collection = db.collection_with_type::<Item>("items");

  // Insert a new Item in the "items" collection using values
  // from the request's body
  items_collection
    .insert_one(
      Item {
        name: item.name,
        price: item.price,
      },
      None,
    )
    .await?;

  // Return 200 if everything went fine
  return Ok(Response::new(StatusCode::Ok));
}

async fn get_items(req: Request<State>) -> tide::Result<tide::Body> {
  // Recover the database connection handle from the Tide state
  let db = &req.state().db;

  // Get a handle to the "items" collection
  let items_collection = db.collection_with_type::<Item>("items");

  // Find all the documents from the "items" collection
  let mut cursor = items_collection.find(None, None).await?;

  // Create a new empty Vector of Item
  let mut data = Vec::<Item>::new();

  // Loop through the results of the find query
  while let Some(result) = cursor.next().await {
    // If the result is ok, add the Item in the Vector
    if let Ok(item) = result {
      data.push(item);
    }
  }

  // Send the response with the list of items
  return Body::from_json(&data);
}


async fn hello(_req: Request<State>) -> tide::Result {
  return Ok("Hello world".into());
}
