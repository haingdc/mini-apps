#![feature(proc_macro_hygiene, decl_macro)]
use rocket::http::{Header, Method};
use rocket::response::{self, Response, Responder};
use rocket::{Request};
use rocket::fairing::{Fairing, Info, Kind};
use serde::{Serialize, Deserialize};
use std::sync::atomic::{AtomicUsize};
use std::sync::RwLock;
use std::collections::{HashMap, HashSet};
use rocket_cors::{AllowedOrigins, CorsOptions};

// IMPORT ROCKET LIBRARY
#[macro_use] extern crate rocket;


pub mod api_key;
pub mod routes;

#[cfg(test)] mod tests;

fn main() {
  rocket().launch();
}

fn rocket() -> rocket::Rocket {
  let cfg = rocket::config::Config::build(rocket::config::Environment::Development)
        .address("127.0.0.1")
        .port(8000)
        .extra("template_dir",  "web/templates")
        .unwrap();
  let cors = CorsOptions::default()
    .allowed_origins(AllowedOrigins::all())
    .allowed_methods(
        vec![Method::Get, Method::Post, Method::Patch]
            .into_iter()
            .map(From::from)
            .collect(),
    )
    .allow_credentials(true);

  rocket::custom(cfg).mount("/api", rocket::routes![
    routes::index,
    routes::world,
    routes::query_greeting,
    routes::greeting,
    routes::json,
    routes::protected,
    routes::login,
    routes::session,
    routes::sensitive,
    routes::add_hero,
    routes::get_all,
    routes::get_hero_list,
    routes::get_hero,
  ])
  // Add managed state. Here we use global state. Request-local state
  // would also be possible.
  //    (see https://rocket.rs/v0.4/guide/state/)
    .manage(RwLock::new(HashMap::<ID, Hero>::new()))
    .manage(HeroCount(AtomicUsize::new(1)))
    .register(catchers![routes::not_found])
    .attach(cors.to_cors().unwrap())
    // .attach(CORS)
  }

// region Simple REST API
type ID = usize;

/* Rocket uses Serde for serializing/deserializing data. */

#[derive(Serialize, Debug, Clone)]
pub struct Hero {
    id: ID,
    name: String,
    #[serde(rename(serialize = "canFly"))]
    can_fly: bool,
}

#[derive(Deserialize, Debug)]
pub struct NewHero {
    name: String,
    #[serde(rename(deserialize = "canFly"))]
    can_fly: bool,
}

// We use a `RwLock`-protected `HashMap` instead of a DB. Note that Rocket has
// built-in support for databases, but this is out-of-scope of this demo.
//    (see https://rocket.rs/v0.4/guide/state/#databases for DB support)
pub struct HeroCount(AtomicUsize);
pub type HeroesMap = RwLock<HashMap<ID, Hero>>;

pub struct CORS;

impl Fairing for CORS {
  fn info(&self) -> Info {
    Info {
      name: "Add CORS headers to response",
      kind: Kind::Response
    }
  }

  fn on_response(&self, request: &Request, response: &mut Response) {
    response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
    response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
    response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
    response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
  }
}

pub struct CORS2<R> {
  responder        : R,
  allow_origin     : &'static str,
  expose_headers   : HashSet<&'static str>,
  allow_credentials: bool,
  allow_headers    : HashSet<&'static str>,
  allow_methods    : HashSet<Method>,
  max_age          : Option<usize>,
}

type PreflightCORS2 = CORS2<()>;

impl PreflightCORS2 {
  pub fn preflight(origin: &'static str) -> PreflightCORS2 {
    CORS2::origin((), origin)
  }
}

impl<'r, R: Responder<'r>> CORS2<R> {
  pub fn origin(responder: R, origin: &'static str) -> CORS2<R> {
    CORS2 {
      responder        : responder,
      allow_origin     : origin,
      expose_headers   : HashSet:: new(),
      allow_credentials: false,
      allow_headers    : HashSet:: new(),
      allow_methods    : HashSet:: new(),
      max_age          : None
    }
  }

  pub fn any(responder: R) -> CORS2<R> {
    CORS2::origin(responder, "*")
  }

  pub fn credentials(mut self, value: bool) -> CORS2<R> {
    self.allow_credentials = value;
    self
  }

  pub fn methods(mut self, methods: Vec<Method>) -> CORS2<R> {
    for method in methods {
      self.allow_methods.insert(method);
    }
    self
  }

  pub fn headers(mut self, headers: Vec<&'static str>) -> CORS2<R> {
    for header in headers {
      self.allow_headers.insert(header);
    }
    self
  }

  // TODO: Add more builder methods to set the rest of the fields.
}

impl<'r, R: Responder<'r>> Responder<'r> for CORS2<R> {

  fn respond_to(self, request: &Request) -> response::Result<'r> {
    let mut response = Response::build_from(self.responder.respond_to(request).unwrap())
      .raw_header("Access-Control-Allow-Origin", self.allow_origin)
      .finalize();

    match self.allow_credentials {
      true => response.set_raw_header("Access-Control-Allow-Credentials", "true"),
      false => response.set_raw_header("Access-Control-Allow-Credentials", "false")
    };

    if !self.allow_methods.is_empty() {
      let mut methods = String::with_capacity(self.allow_methods.len() * 7);
      for (i, method) in self.allow_methods.iter().enumerate() {
        if i != 0 { methods.push_str(", ") }
        methods.push_str(method.as_str());
      }

      response.set_raw_header("Access-Control-Allow-Methods", methods);
    }

    // FIXME: Get rid of this dupe.
    if !self.allow_headers.is_empty() {
      let mut headers = String::with_capacity(self.allow_headers.len() * 15);
      for (i, header) in self.allow_headers.iter().enumerate() {
        if i != 0 { headers.push_str(", ") }
        headers.push_str(header);
      }

      response.set_raw_header("Access-Control-Allow-Headers", headers);
    }

    // TODO: Inspect and set the rest of the fields.

    Ok(response)
  }

  // fn respond(self) -> response::Result<'r> {
  //   let mut response = Response::build_from(self.responder.respond_to().unwrap()?)
  //     .raw_header("Access-Control-Allow-Origin", self.allow_origin)
  //     .finalize();

  //   match self.allow_credentials {
  //     true => response.set_raw_header("Access-Control-Allow-Credentials", "true"),
  //     false => response.set_raw_header("Access-Control-Allow-Credentials", "false")
  //   };

  //   if !self.allow_methods.is_empty() {
  //     let mut methods = String::with_capacity(self.allow_methods.len() * 7);
  //     for (i, method) in self.allow_methods.iter().enumerate() {
  //       if i != 0 { methods.push_str(", ") }
  //       methods.push_str(method.as_str());
  //     }

  //     response.set_raw_header("Access-Control-Allow-Methods", methods);
  //   }

  //   // FIXME: Get rid of this dupe.
  //   if !self.allow_headers.is_empty() {
  //     let mut headers = String::with_capacity(self.allow_headers.len() * 15);
  //     for (i, header) in self.allow_headers.iter().enumerate() {
  //       if i != 0 { headers.push_str(", ") }
  //       headers.push_str(header);
  //     }

  //     response.set_raw_header("Access-Control-Allow-Headers", headers);
  //   }

  //   // TODO: Inspect and set the rest of the fields.

  //   Ok(response)
  // }

}