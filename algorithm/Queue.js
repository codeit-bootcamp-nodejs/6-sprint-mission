// ======================================
// ----------- 스프린트 미션 13 -----------
// ======================================

// 큐 (Queue)

// 메서드:
//   - enqueue(value): 큐의 맨 뒤에 값을 추가
//   - dequeue(): 큐의 앞에서 값을 제거하고 그 값을 리턴
//   - peek(): 큐의 앞에 있는 값을 제거하지 않고 리턴
//   - isEmpty(): 큐가 비어 있는지 불린형으로 리턴

// 핵심 키워드 :
// - FIFO(First-In, First-Out): 선입선출. 가장 먼저 들어온 데이터가 가장 먼저 나가는 데이터 처리 원칙
// - Front / Head: 데이터를 꺼내는(Dequeue) 위치
// - Rear / Tail: 데이터를 넣는(Enqueue) 위치
// - Buffer(버퍼): 데이터의 처리 속도 차이를 완충하기 위해 일시적으로 데이터를 보관하는 용도의 메모리 공간

class Queue {
  constructor() {
    this.items = {}; // 데이터 저장을 위한 객체 (O(1) 접근)
    this.headIndex = 0; // 앞쪽(Dequeue) 포인터
    this.tailIndex = 0; // 뒤쪽(Enqueue) 포인터
  }

  // enqueue(value): 큐의 맨 뒤에 값을 추가
  enqueue(value) {
    this.items[this.tailIndex] = value;
    this.tailIndex++;
  }

  // dequeue(): 큐의 앞에서 값을 제거하고 그 값을 리턴
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.items[this.headIndex];
    delete this.items[this.headIndex]; // 메모리 관리를 위해 객체에서 제거
    this.headIndex++;

    // 리스트가 완전히 비었을 경우 인덱스 초기화 (메모리 단편화 방지 보조)
    if (this.isEmpty()) {
      this.headIndex = 0;
      this.tailIndex = 0;
    }

    return value;
  }

  // peek(): 큐의 앞에 있는 값을 제거하지 않고 리턴
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.headIndex];
  }

  // isEmpty(): 큐가 비어 있는지 불린형으로 리턴
  isEmpty() {
    return this.tailIndex - this.headIndex === 0;
  }
}

// ======================================
// 테스트 코드 (검증)
// ======================================

const queue = new Queue();
console.log("--- Initial State (isEmpty) ---");
console.log(queue.isEmpty());

console.log("\n--- Enqueue Test: '10, 20, 30' 값 삽입 ---");
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("Queue Data: ", queue.items);
console.log(`Peek: ${queue.peek()}`);

console.log("\n--- Dequeue Test : { 0:10, 1:20, 2:30 } 중 맨 앞 삭제 ---");
console.log(`Dequeue() 전 Peek() 값 확인: ${queue.peek()}`);
console.log(`Dequeue() 진행: ${queue.dequeue()}`);
console.log(`Dequeue() 후 Peek() 값 확인: ${queue.peek()}`);
console.log("남은 데이터: ", queue.items);

console.log("\n--- isEmpty Check : 객체 { 1:10, 2:20 }을 비우고 isEmpty() 진행 ---");
console.log("객체 비우기 전 남은 데이터: ", queue.items);
console.log(`객체 비우기 전 isEmpty(): ${queue.isEmpty()}`);
queue.dequeue();
queue.dequeue();
console.log("객체 비운 후 남은 데이터: ", queue.items);
console.log(`객체 비운 후 isEmpty(): ${queue.isEmpty()}`);
