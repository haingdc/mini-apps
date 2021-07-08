pub fn get_command_from_query_string(query_string: &str) -> &str {
  if query_string.contains(' ') {
    let index_of_space = query_string.find(' ').unwrap_or(0);
    return &query_string[..index_of_space];
  }
  &query_string
}