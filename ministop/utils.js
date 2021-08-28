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

/**
 * Determine column index by item index and columns number.
 * @param {number} i index of an item
 * @param {number} cols columns number
 */
function getCol(i, cols) {
  if (cols <= 0) throw new Error(`expect cols must be positive value but get ${cols}`);
  return i % cols;
}

export {
  countColumns,
  getCol,
};