class Stack {
  constructor() {
    this._items = [];
  }

  /**
   * 스택의 맨 위에 값을 추가합니다.
   * @param {*} value
   */
  push(value) {
    this._items.push(value);
  }

  /**
   * 스택의 맨 위 값을 제거하고 반환합니다. 비어 있으면 undefined.
   * @returns {*|undefined}
   */
  pop() {
    return this._items.pop();
  }

  /**
   * 스택의 맨 위 값을 제거하지 않고 반환합니다. 비어 있으면 undefined.
   * @returns {*|undefined}
   */
  peek() {
    const n = this._items.length;
    return n ? this._items[n - 1] : undefined;
  }

  /**
   * 스택이 비어 있는지 여부를 반환합니다.
   * @returns {boolean}
   */
  isEmpty() {
    return this._items.length === 0;
  }
}

/** 연결 리스트 기반 스택 구현 */
class StackLinkedList {
  constructor() {
    this._top = null;
    this._size = 0;
  }

  push(value) {
    this._top = { value, next: this._top };
    this._size++;
  }

  pop() {
    if (!this._top) return undefined;
    const { value } = this._top;
    this._top = this._top.next;
    this._size--;
    return value;
  }

  peek() {
    return this._top ? this._top.value : undefined;
  }

  isEmpty() {
    return this._size === 0;
  }
}

module.exports = Stack;
module.exports.StackLinkedList = StackLinkedList;

if (require.main === module) {
  // 1) 배열 기반 스택 동작 확인
  const stack = new Stack();
  console.log("isEmpty (init):", stack.isEmpty());

  // 2) 값 3개를 push 해서 LIFO 구조를 만듭니다.
  stack.push(10);
  stack.push(20);
  stack.push(30);

  // 3) peek/pop 결과로 마지막에 넣은 값(30)이 먼저 나오는지 확인
  console.log("peek:", stack.peek());
  console.log("pop:", stack.pop());
  console.log("peek after pop:", stack.peek());

  // 4) 하나를 꺼낸 뒤에도 원소가 남아 있는지 확인
  console.log("isEmpty (end):", stack.isEmpty());

  // 5) 연결 리스트 기반 스택 동작 확인
  const linkedStack = new StackLinkedList();
  linkedStack.push("a");
  linkedStack.push("b");
  linkedStack.push("c");
  console.log("linked peek:", linkedStack.peek());
  console.log("linked pop:", linkedStack.pop());
  console.log("linked peek after pop:", linkedStack.peek());
}
