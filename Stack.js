class Stack {
  constructor() {
    this.items = [];
  }

  // 스택의 맨 위에 값을 추가
  push(value) {
    this.items.push(value);
  }

  // 스택의 맨 위 값을 제거하고 그 값을 리턴
  pop() {
    return this.items.pop();
  }

  // 스택의 맨 위 값을 제거하지 않고 그 값을 리턴
  peek() {
    return this.items[this.items.length - 1];
  }

  // 스택이 비어 있는지 불린형으로 리턴
  isEmpty() {
    return this.items.length === 0;
  }
}

module.exports = Stack;

if (require.main === module) {
  const stack = new Stack();
  console.log("isEmpty:", stack.isEmpty());
  console.log("peek (empty):", stack.peek());
  console.log("pop (empty):", stack.pop());

  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log("peek:", stack.peek());
  console.log("pop:", stack.pop());
  console.log("pop:", stack.pop());
  console.log("pop:", stack.pop());
  console.log("isEmpty:", stack.isEmpty());
}
