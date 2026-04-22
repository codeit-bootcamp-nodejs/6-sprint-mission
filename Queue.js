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
    this.length = 0;
  }

  // 큐가 비어 있는지 불린형으로 리턴
  isEmpty() {
    return this.front === null;
  }

  // 큐 맨 뒤에 값을 추가
  enqueue(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.length++;
    return newNode;
  }

  // 큐의 앞에서 값을 제거하고, 그 값을 리턴
  dequeue() {
    if (this.isEmpty()) return null;

    const dataToRemove = this.front.data;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.length--;
    return dataToRemove;
  }

  // 큐의 앞에 있는 값을 제거하지 않고 리턴
  peek() {
    return this.front === null ? null : this.front.data;
  }

  // 큐의 길이 리턴
  getSize() {
    return this.length;
  }

  // 내부 상태 확인을 위한 보조 메소드
  toString() {
    let resStr = 'front → |';
    let iterator = this.front;
    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.next;
    }
    return resStr + ' ← rear';
  }
}

//--------------------------------------- 테스트 코드
console.log('---------------------------------------------- Queue.js');
const 울집강쥐 = new Queue();

//--------------- isEmpty 테스트
console.log('isEmpty()');
console.log(울집강쥐.isEmpty());
console.log('');

//--------------- enqueue 테스트
console.log(`enqueue('힐리'); enqueue('카르마'); enqueue('베일리');`);
울집강쥐.enqueue('힐리');
울집강쥐.enqueue('카르마');
울집강쥐.enqueue('베일리');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//--------------- dequeue 테스트
console.log('dequeue()');
울집강쥐.dequeue();
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//--------------- peek 테스트
console.log('peek()');
console.log(울집강쥐.peek());
console.log('');

//--------------- isEmpty 테스트
console.log('isEmpty()');
console.log(울집강쥐.isEmpty());
console.log('');
