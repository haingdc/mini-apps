var { pipeWith, unapply, andThen } = R;

var pipePromises = unapply (pipeWith (andThen))

pipePromises (
  (n) => Promise .resolve (n + 1),
  (n) => Promise .resolve (n * n),
  (n) => Promise .resolve (n - 3)
) 
(4) 
.then (console .log)  //~> 22