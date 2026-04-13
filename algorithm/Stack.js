class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  isEmpty() {
    return this.top === null;
  }

  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
    this._size++;
  }

  pop() {
    if (this.isEmpty()) return null;
    const data = this.top.data;
    this.top = this.top.next;
    this._size--;
    return data;
  }

  peek() {
    return this.isEmpty() ? null : this.top.data;
  }

  toString() {
    let resStr = 'top => |';
    let iterator = this.top;
    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.next;
    }
    return resStr + ' <= bottom';
  }
}

const stack = new Stack();

// 1. isEmpty - 빈 스택 확인
console.log(stack.isEmpty()); // true
console.log('size:', stack.size); // size: 0

// 2. push - 스택 위에 값 추가
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.toString()); // top => | 30 | 20 | 10 | <= bottom
console.log('size:', stack.size); // size: 3
console.log(stack.isEmpty()); // false

// 3. peek - 맨 위 값 확인 (제거 없음)
console.log('peek:', stack.peek()); // peek: 30
console.log(stack.toString()); // top => | 30 | 20 | 10 | <= bottom (변화 없음)

// 4. pop - 맨 위 값 제거 후 리턴
console.log('pop:', stack.pop()); // pop: 30
console.log(stack.toString()); // top => | 20 | 10 | <= bottom
console.log('size:', stack.size); // size: 2

console.log('pop:', stack.pop()); // pop: 20
console.log(stack.toString()); // top => | 10 | <= bottom
console.log('size:', stack.size); // size: 1

// 5. 마지막 요소까지 pop
console.log('pop:', stack.pop()); // pop: 10
console.log(stack.toString()); // top => | <= bottom
console.log(stack.isEmpty()); // true
console.log('size:', stack.size); // size: 0

// 6. 빈 스택에서 pop & peek
console.log('pop:', stack.pop()); // pop: null
console.log('peek:', stack.peek()); // peek: null
