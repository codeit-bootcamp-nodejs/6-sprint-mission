class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this._size = 0;
  }

  get size() {
    return this._size;
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
    this._size++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const data = this.front.data;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this._size--;
    return data;
  }

  peek() {
    return this.isEmpty() ? null : this.front.data;
  }

  toString() {
    let resStr = 'front => |';
    let iterator = this.front;
    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.next;
    }
    return resStr + ' <= rear';
  }
}

const queue = new Queue();

// 1. isEmpty - 빈 큐 확인
console.log(queue.isEmpty()); // true
console.log('size:', queue.size); // size: 0

// 2. enqueue - 큐 뒤쪽에 값 추가
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.toString()); // front => | 10 | 20 | 30 | <= rear
console.log('size:', queue.size); // size: 3
console.log(queue.isEmpty()); // false

// 3. peek - 앞쪽 값 확인 (제거 없음)
console.log('peek:', queue.peek()); // peek: 10
console.log(queue.toString()); // front => | 10 | 20 | 30 | <= rear (변화 없음)

// 4. dequeue - 앞쪽에서 값 제거 후 리턴
console.log('dequeue:', queue.dequeue()); // dequeue: 10
console.log(queue.toString()); // front => | 20 | 30 | <= rear
console.log('size:', queue.size); // size: 2

console.log('dequeue:', queue.dequeue()); // dequeue: 20
console.log(queue.toString()); // front => | 30 | <= rear
console.log('size:', queue.size); // size: 1

// 5. 마지막 요소까지 dequeue
console.log('dequeue:', queue.dequeue()); // dequeue: 30
console.log(queue.toString()); // front => | <= rear
console.log(queue.isEmpty()); // true
console.log('size:', queue.size); // size: 0

// 6. 큐에서 dequeue & peek
console.log('dequeue:', queue.dequeue()); // dequeue: null
console.log('peek:', queue.peek()); // peek: null
