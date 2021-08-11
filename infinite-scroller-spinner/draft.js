todo.scroller_.scrollTo(0, 10000)

todo.firstAttachedItem_
todo.lastAttachedItem_

todo.loadedItems_
todo.anchorItem

todo.anchorItem.offset

todo.items_[todo.anchorItem.index]
var lastScreenItem = todo.calculateAnchoredItem(todo.anchorItem, todo.scroller_.offsetHeight);
todo.items_[lastScreenItem.index]

todo.items_[todo.lastAttachedItem_ - 50]
todo.items_[todo.lastAttachedItem_ - 10]


todo.items_.filter(m => m.node).map(n => [n.node.querySelector('p').textContent, n.data.id])


todo.scroller_.offsetHeight