const test = require("node:test");
const assert = require("node:assert/strict");
const LinkedList = require("./LinkedList.js");

test("addNode와 findNode", () => {
  const list = new LinkedList();
  list.addNode(10);
  list.addNode(20);
  const n = list.findNode(20);
  assert.ok(n);
  assert.equal(n.value, 20);
  assert.equal(list.findNode(99), null);
});

test("insertAfter: 대상 없으면 false", () => {
  const list = new LinkedList();
  list.addNode(1);
  assert.equal(list.insertAfter(2, 3), false);
});

test("insertAfter와 removeAfter", () => {
  const list = new LinkedList();
  list.addNode("a");
  list.addNode("b");
  assert.equal(list.insertAfter("a", "x"), true);
  assert.equal(list.findNode("x").next.value, "b");
  assert.equal(list.removeAfter("a"), "x");
  assert.equal(list.findNode("x"), null);
  assert.equal(list.removeAfter("b"), null);
});
