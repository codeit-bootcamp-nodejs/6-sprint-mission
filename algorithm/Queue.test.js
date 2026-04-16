const test = require("node:test");
const assert = require("node:assert/strict");
const Queue = require("./Queue.js");

test("빈 큐는 dequeue/peek이 undefined", () => {
  const q = new Queue();
  assert.equal(q.dequeue(), undefined);
  assert.equal(q.peek(), undefined);
  assert.equal(q.isEmpty(), true);
});

test("enqueue 후 FIFO 순서로 dequeue", () => {
  const q = new Queue();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  assert.equal(q.dequeue(), 1);
  assert.equal(q.dequeue(), 2);
  assert.equal(q.peek(), 3);
  assert.equal(q.dequeue(), 3);
  assert.equal(q.isEmpty(), true);
});

test("peek은 요소를 제거하지 않음", () => {
  const q = new Queue();
  q.enqueue("a");
  assert.equal(q.peek(), "a");
  assert.equal(q.peek(), "a");
  assert.equal(q.dequeue(), "a");
});
