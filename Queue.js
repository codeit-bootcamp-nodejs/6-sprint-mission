class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  // 큐의 맨 뒤에 값을 추가
  enqueue(value) {
    this.items[this.tailIndex] = value;
    this.tailIndex++;
  }

  // 큐의 앞에서 값을 제거하고 그 값을 리턴
  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  // 큐의 앞에 있는 값을 제거하지 않고 리턴
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.headIndex];
  }

  // 큐가 비어 있는지 불린형으로 리턴
  isEmpty() {
    return this.headIndex === this.tailIndex;
  }
}

module.exports = Queue;

if (require.main === module) {
  const q = new Queue();
  console.log("isEmpty:", q.isEmpty());
  console.log("peek (empty):", q.peek());
  console.log("dequeue (empty):", q.dequeue());

  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  console.log("peek:", q.peek());
  console.log("dequeue:", q.dequeue());
  console.log("dequeue:", q.dequeue());
  console.log("dequeue:", q.dequeue());
  console.log("isEmpty:", q.isEmpty());
}
