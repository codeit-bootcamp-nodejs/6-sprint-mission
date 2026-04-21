/*
push(value): 스택의 맨 위에 값을 추가
pop(): 스택의 맨 위 값을 제거하고 그 값을 리턴
peek(): 스택의 맨 위 값을 제거하지 않고 그 값을 리턴
isEmpty(): 스택이 비어 있는지 불린형으로 리턴
*/

// Node 클래스
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Stack 클래스
class Stack {
  constructor() {
    this.top = null; // 스택의 맨 위 노드
  }

  // 스택이 비어있는지 확인
  isEmpty() {
    return this.top === null;
  }

  // 스택의 맨 위에 값을 추가
  push(data) {
    const newNode = new Node(data);
    newNode.next = this.top;
    this.top = newNode;
  }

  // 스택의 맨 위 값을 제거하고 그 값을 리턴
  pop() {
    if (this.isEmpty()) {
      return null; // 스택이 비어있으면 null 반환
    }
    const poppedData = this.top.data;
    this.top = this.top.next;
    return poppedData;
  }

  // 스택의 맨 위 값을 제거하지 않고 그 값을 리턴
  peek() {
    if (this.isEmpty()) {
      return null; // 스택이 비어있으면 null 반환
    }
    return this.top.data;
  }

  // 스택을 문자열로 표현해서 리턴하는 메소드
  toString() {
    let resStr = "|";
    let iterator = this.top;

    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.next;
    }

    return resStr;
  }
}

// 스택 사용 예시
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.toString()); // | 30 | 20 | 10 |
console.log(stack.peek()); // 30
console.log(stack.pop()); // 30
console.log(stack.toString()); // | 20 | 10 |
