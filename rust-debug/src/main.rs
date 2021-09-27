#[allow(dead_code)]
struct Node {
    value: i32,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>
}

struct Tree {
    root: Option<Box<Node>>
}

#[allow(unused_macros)]
macro_rules! node {
    ( $($props:ident : $value:expr),* ) => {
        Some(Box::new(Node {
            $($props: $value),*
        }))
    }
}

impl Node {
    fn traversal(&self) -> String {
        let mut output = String::new();

        // Left
        match self.left {
            Some(ref node) => {
                output += node.traversal().as_str();
            },
            None => { }
        }

        // Root
        output += self.value.to_string().as_str();

        // Right
        match self.right {
            Some(ref node) => {
                output += node.traversal().as_str();
            },
            None => { }
        }
        return output;
    }
}

impl Tree {
    fn insert(&mut self, value: i32, root: Option<Box<Node>>) -> () {
        match root {
            Some(ref node) => {

            },
            None => {
                self.root = node!( value: value, left: None, right: None );
            }
        }
    }
}


#[allow(unused_variables)]
fn main() {
    // let tree = Node {
    //     value: 7,
    //     left: node!(
    //         value: 4,
    //         left: None,
    //         right: None
    //     ),
    //     right: node!(
    //         value: 19,
    //         left: None,
    //         right: None
    //     ),
    // };
    // println!("{}", tree.traversal());
    let mut tree = Tree { root: None };
    let node1 = node!( value: 7, left: None, right: None );
    tree.insert(4, None);
    match tree.root {
        Some(ref node) => {
            println!("{}", node.traversal());
        },
        None => {
            println!("Empty Tree");
        }
    }
}


