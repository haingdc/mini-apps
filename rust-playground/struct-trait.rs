pub trait SomeTrait {
  fn is_valid(&self) -> bool ;
  // fn get_the_better_one(&self, some_other_dude: &Self) -> Self;
}

#[allow(dead_code)]
#[derive(Debug)]
struct DougsData {
  some_int: i32,
  some_float: f64,
  some_bool: bool,
  random: RandomInfo,
}

#[derive(Debug)]
pub struct RandomInfo {
  pub call_count: i64,
  pub some_bool : bool,
  pub some_int: i64,
}

impl SomeTrait for RandomInfo {
  fn is_valid(&self) -> bool {
      self.some_bool
  }
}

impl SomeTrait for DougsData {
  fn is_valid(&self) -> bool {
      true
  }
}

impl Default for DougsData {
  fn default() -> Self {
      Self {
          some_bool: true,
          some_float: 10.3,
          some_int: 80,
          random: RandomInfo::new(true),
      }
  }
}

impl RandomInfo {
  pub fn new(param_a: bool) -> Self {
      Self { call_count: 0, some_bool: !param_a, some_int: 8 }
  }
  
}

fn print_if_is_valid(check_me: &dyn SomeTrait) {
  if check_me.is_valid() {
      println!("Yay!");
  }
}

#[allow(unused_variables)]
fn main() {
  let  random_info_var = RandomInfo {
      call_count: 0,
      some_bool: true,
      some_int: 10,
  }; 
  
  
  let  dougs_var = DougsData::default();
  
  println!("{:?}", dougs_var);
  
  print_if_is_valid(&random_info_var); 
  print_if_is_valid(&dougs_var);
  
}