/*
enqueue(value): 큐의 맨 뒤에 값을 추가
dequeue(): 큐의 앞에서 값을 제거하고 그 값을 리턴
peek(): 큐의 앞에 있는 값을 제거하지 않고 리턴
isEmpty(): 큐가 비어 있는지 불린형으로 리턴
*/
// Node 클래스
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Queue 클래스

class Queue {
  constructor() {
    this.front = null; // 큐의 앞 노드
    this.rear = null; // 큐의 뒤 노드
  }
  // 큐가 비어있는지 확인
  isEmpty() {
    return this.front === null;
  }

  // 큐의 맨 뒤에 값을 추가
  enqueue(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
  }

  // 큐의 앞에서 값을 제거하고 그 값을 리턴
  dequeue() {
    if (this.isEmpty()) {
      return null; // 큐가 비어있으면 null 반환
    }
    const dequeuedData = this.front.data;
    this.front = this.front.next;
    if (this.front === null) {
      this.rear = null; // 큐가 비어졌을 때 rear도 null로 설정
    }
    return dequeuedData;
  }

  // 큐의 앞에 있는 값을 제거하지 않고 리턴
  peek() {
    if (this.isEmpty()) {
      return null; // 큐가 비어있으면 null 반환
    }
    return this.front.data;
  }

  // 큐를 문자열로 표현해서 리턴하는 메소드
  toString() {
    let resStr = "Front -> ";
    let iterator = this.front;

    while (iterator !== null) {
      resStr += `${iterator.data} -> `;
      iterator = iterator.next;
    }

    resStr += "Rear";
    return resStr;
  }
}

// 큐 사용 예시
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.toString()); // Front -> 1 -> 2 -> 3 -> Rear
console.log(queue.dequeue()); // 1
console.log(queue.peek()); // 2
console.log(queue.toString()); // Front -> 2 -> 3 -> Rear
console.log(queue.isEmpty()); // false
queue.dequeue();
queue.dequeue();
console.log(queue.isEmpty()); // true
