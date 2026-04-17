class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  isEmpty() {
    return this.top === null;
  }

  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    if (this.isEmpty()) return null;

    const value = this.top.value;
    this.top = this.top.next;
    return value;
  }

  peek() {
    return this.isEmpty() ? null : this.top.value;
  }
}

const stack = new Stack();
console.log(stack.isEmpty()); // true

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.peek()); // 3
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.isEmpty()); // false
console.log(stack.pop()); // 1
console.log(stack.isEmpty()); // true
console.log(stack.pop()); // null
