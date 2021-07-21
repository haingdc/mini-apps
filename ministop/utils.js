/**
 * @param {HTMLElement[]} children
 *  */
function countColumns(children) {
  var col = 0;
  if (!children.length) {
    return col;
  }
  var firstY = children[0].getBoundingClientRect().y;
	for(col = 1; col < children.length; col++) {
    var y = children[col].getBoundingClientRect().y;
    if (y == undefined || firstY != y) {
      break;
    }
  }
  return col;
}

export {
  countColumns,
};