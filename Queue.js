/**
 * 클래스 이름: Queue
 * enqueue(value): 큐의 맨 뒤에 값을 추가
 * dequeue(): 큐의 앞에서 값을 제거하고 그 값을 리턴
 * peek(): 큐의 앞에 있는 값을 제거하지 않고 리턴
 * isEmpty(): 큐가 비어 있는지 불린형으로 리턴
 */

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  // 큐의 맨 뒤에 값을 추가
  enqueue(value) {
    this.storage[this.rear] = value;
    this.rear++;
  }

  // 큐의 앞에서 값을 제거하고 반환
  dequeue() {
    if (this.isEmpty()) return undefined;

    const result = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;

    return result;
  }

  // 큐의 앞에 있는 값을 제거하지 않고 반환
  peek() {
    if (this.isEmpty()) return undefined;
    return this.storage[this.front];
  }

  // 큐가 비어 있는지 확인
  isEmpty() {
    return this.front === this.rear;
  }
}
