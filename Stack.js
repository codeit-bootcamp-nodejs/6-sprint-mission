/**
 * 클래스 이름: Stack
 * push(value): 스택의 맨 위에 값을 추가
 * pop(): 스택의 맨 위 값을 제거하고 그 값을 리턴
 * peek(): 스택의 맨 위 값을 제거하지 않고 그 값을 리턴
 * isEmpty(): 스택이 비어 있는지 불린형으로 리턴
 */

class Stack {
  constructor() {
    this.items = [];
  }

  // 스택의 맨 위에 값을 추가
  push(value) {
    this.items.push(value);
  }

  // 스택의 맨 위 값을 제거하고 반환
  pop() {
    if (this.isEmpty()) return undefined;
    return this.items.pop();
  }

  // 스택의 맨 위 값을 제거하지 않고 반환
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  // 스택이 비어 있는지 확인
  isEmpty() {
    return this.items.length === 0;
  }
}
