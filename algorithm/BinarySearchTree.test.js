const test = require("node:test");
const assert = require("node:assert/strict");
const BinarySearchTree = require("./BinarySearchTree.js");

test("insert와 find", () => {
  const bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  bst.insert(7);
  assert.equal(bst.find(3).value, 3);
  assert.equal(bst.find(7).value, 7);
  assert.equal(bst.find(99), null);
});

test("같은 값 재삽입은 트리를 늘리지 않음", () => {
  const bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(5);
  assert.equal(bst.find(5).left, null);
  assert.equal(bst.find(5).right, null);
});

test("remove: 리프", () => {
  const bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  assert.equal(bst.remove(3), true);
  assert.equal(bst.find(3), null);
  assert.equal(bst.find(5).value, 5);
});

test("remove: 자식 하나", () => {
  const bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  bst.insert(2);
  assert.equal(bst.remove(3), true);
  assert.equal(bst.find(2).value, 2);
});

test("remove: 자식 둘 (후임은 오른쪽 최소값)", () => {
  const bst = new BinarySearchTree();
  [5, 3, 7, 2, 4, 6, 8].forEach((v) => bst.insert(v));
  assert.equal(bst.remove(5), true);
  assert.equal(bst.find(5), null);
  assert.ok(bst.find(3) && bst.find(7));
});

test("remove: 없는 값은 false", () => {
  const bst = new BinarySearchTree();
  bst.insert(1);
  assert.equal(bst.remove(9), false);
});
