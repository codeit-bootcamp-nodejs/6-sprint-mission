// Queue.js
class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.storage[this.rear++] = value;
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.storage[this.front];
    delete this.storage[this.front++];
    return value;
  }
  peek() { return this.storage[this.front]; }
  isEmpty() { return this.rear === this.front; }
}