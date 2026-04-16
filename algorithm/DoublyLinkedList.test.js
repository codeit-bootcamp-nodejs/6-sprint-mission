const test = require("node:test");
const assert = require("node:assert/strict");
const DoublyLinkedList = require("./DoublyLinkedList.js");

test("addToHead / addToTail 연결", () => {
  const list = new DoublyLinkedList();
  list.addToTail(2);
  list.addToHead(1);
  list.addToTail(3);
  assert.equal(list.head.value, 1);
  assert.equal(list.tail.value, 3);
  assert.equal(list.head.next.value, 2);
  assert.equal(list.tail.prev.value, 2);
});

test("insertAfter가 tail을 갱신", () => {
  const list = new DoublyLinkedList();
  list.addToTail("a");
  list.addToTail("b");
  assert.equal(list.insertAfter("b", "c"), true);
  assert.equal(list.tail.value, "c");
  assert.equal(list.tail.prev.value, "b");
});

test("removeNode: head, middle, tail", () => {
  const list = new DoublyLinkedList();
  list.addToTail(1);
  list.addToTail(2);
  list.addToTail(3);
  assert.equal(list.removeNode(2), true);
  assert.equal(list.findNode(2), null);
  assert.equal(list.removeNode(1), true);
  assert.equal(list.head.value, 3);
  assert.equal(list.removeNode(3), true);
  assert.equal(list.head, null);
  assert.equal(list.tail, null);
});

test("removeNode: 없는 값은 false", () => {
  const list = new DoublyLinkedList();
  list.addToTail(1);
  assert.equal(list.removeNode(9), false);
});
