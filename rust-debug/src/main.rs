// #[allow(dead_code)]
// struct Node {
//   data: i32,
//   left: Option<Box<Node>>,
//   right: Option<Box<Node>>
// }

// struct Tree {
//   root: Option<Box<Node>>
// }

// #[allow(unused_macros)]
// macro_rules! node {
//   ( $($props:ident : $value:expr),* ) => {
//     Some(Box::new(Node {
//       $($props: $value),*
//     }))
//   }
// }

// impl Node {
//   fn traversal(&self) -> String {
//     let mut output = String::new();

//     // Left
//     match self.left {
//       Some(ref node) => {
//         output += node.traversal().as_str();
//       },
//       None => { }
//     }

//     // Root
//     output += self.data.to_string().as_str();

//     // Right
//     match self.right {
//       Some(ref node) => {
//         output += node.traversal().as_str();
//       },
//       None => { }
//     }
//     return output;
//   }
// }

// impl Tree {
//   fn insert(&mut self, value: i32, mut root: Option<Box<Node>>) -> () {
//     match root {
//       None => {
//         self.root = node!( data: value, left: None, right: None );
//       },
//       Some(ref mut node_root) => {
//         if node_root.data > value {
//           match node_root.left {
//             None => {
//               node_root.left = node!( data: value, left: None,  right: None );
//             },
//             Some(ref node_left) => {
//               self.insert(value, node_root.left);
//             }
//           }
//         }
//       }
//     }
//   }
// }


// #[allow(unused_variables)]
// fn main() {
//   // let tree = Node {
//   //     value: 7,
//   //     left: node!(
//   //         value: 4,
//   //         left: None,
//   //         right: None
//   //     ),
//   //     right: node!(
//   //         value: 19,
//   //         left: None,
//   //         right: None
//   //     ),
//   // };
//   // println!("{}", tree.traversal());
//   let mut tree = Tree { root: None };
//   let node1 = node!( data: 7, left: None, right: None );
//   tree.insert(4, None);
//   match tree.root {
//     Some(ref node) => {
//       println!("{}", node.traversal());
//     },
//     None => {
//       println!("Empty Tree");
//     }
//   }
// }
use rust_debug::first::List;

#[allow(unused_variables)]
fn main() {
  let list: List<i32> = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
  println!("{:?}", list);
}