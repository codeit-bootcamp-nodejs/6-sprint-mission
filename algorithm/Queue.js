class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  isEmpty() {
    return this.front === null;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
  }
  dequeue() {
    if (this.isEmpty()) return null;

    const value = this.front.value;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    return value;
  }

  peek() {
    return this.isEmpty() ? null : this.front.value;
  }
}

const q = new Queue();
console.log(q.isEmpty()); // true

q.enqueue("A");
q.enqueue("B");
q.enqueue("C");

console.log(q.peek()); // A
console.log(q.dequeue()); // A
console.log(q.dequeue()); // B
console.log(q.isEmpty()); // false
console.log(q.dequeue()); // C
console.log(q.isEmpty()); // true
