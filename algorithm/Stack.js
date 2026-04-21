// ======================================
// ----------- 스프린트 미션 13 -----------
// ======================================

// 스택 (Stack)

// 메서드:
//   - push(value): 스택의 맨 위에 값을 추가
//   - pop(): 스택의 맨 위 값을 제거하고 그 값을 리턴
//   - peek(): 스택의 맨 위 값을 제거하지 않고 그 값을 리턴
//   - isEmpty(): 스택이 비어 있는지 불린형으로 리턴

// 핵심 키워드 :
// - LIFO(Last-In, First-Out): 후입선출. 가장 마지막에 들어온 데이터가 가장 먼저 나가는 상자 쌓기 형태의 구조
// - Push: 스택의 맨 위에 데이터를 추가하는 작업
// - Pop: 스택의 맨 위에서 데이터를 꺼내어 삭제하는 작업
// - Peek / Top: 스택의 맨 위 데이터를 삭제하지 않고 확인하는 작업

class Stack {
  constructor() {
    this.items = []; // 최적화된 내장 배열 사용
  }

  // push(value): 스택의 맨 위에 값을 추가
  push(value) {
    this.items.push(value);
  }

  // pop(): 스택의 맨 위 값을 제거하고 그 값을 리턴
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // peek(): 스택의 맨 위 값을 제거하지 않고 그 값을 리턴
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // isEmpty(): 스택이 비어 있는지 불린형으로 리턴
  isEmpty() {
    return this.items.length === 0;
  }
}

// ======================================
// 테스트 코드 (검증)
// ======================================

const stack = new Stack();
console.log("--- Initial State (초기 , isEmpty() 진행) ---");
console.log(stack.isEmpty());

console.log("\n--- Push Test: [100, 200, 300] 값 삽입---");
stack.push(100);
stack.push(200);
stack.push(300);
console.log(`Stack Data: ${stack.items}`);
console.log(`Peek() 마지막 값 확인: ${stack.peek()}`);

console.log("\n--- Pop Test : [100, 200, 300] 중 맨 위 값 삭제 ---");
console.log(`Pop() 전 Peek() 값 확인: ${stack.peek()}`);
console.log(`Pop() 진행: ${stack.pop()}`);
console.log(`Pop() 후 Peek() 값 확인: ${stack.peek()}`);
console.log(`남은 데이터: ${stack.items}`);

console.log("\n--- isEmpty Test : 배열 [100, 200]을 비우고 isEmpty() 진행 ---");
console.log(`배열 비우기 전 남은 데이터: ${stack.items}`);
console.log(`배열 비우기 전 isEmpty(): ${stack.isEmpty()}`);
stack.pop();
stack.pop();
console.log(`배열 비운 후 남은 데이터: ${stack.items}`);
console.log(`배열 비운 후 isEmpty(): ${stack.isEmpty()}`);
