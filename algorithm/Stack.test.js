const test = require("node:test");
const assert = require("node:assert/strict");
const Stack = require("./Stack.js");

test("빈 스택은 pop/peek이 undefined", () => {
  const s = new Stack();
  assert.equal(s.pop(), undefined);
  assert.equal(s.peek(), undefined);
  assert.equal(s.isEmpty(), true);
});

test("push/pop은 LIFO", () => {
  const s = new Stack();
  s.push(1);
  s.push(2);
  assert.equal(s.peek(), 2);
  assert.equal(s.pop(), 2);
  assert.equal(s.pop(), 1);
  assert.equal(s.isEmpty(), true);
});
