class Node {
    constructor(data) {
        this.data = data; // 노드가 저장하는 데이터
        this.next = null; // 다음 노드에 대한 레퍼런스
    }
}

/**
 * 스택 (Stack)
 * - LIFO(Last In, First Out): 나중에 들어온 데이터가 먼저 나가는 구조
 * - 내부적으로 링크드 리스트를 사용하여 push/pop 모두 O(1) 보장
 * - head를 top으로 사용하여 항상 앞쪽에서만 삽입/삭제
 *
 *   push("A") → push("B") → push("C")
 *
 *   top
 *    ↓
 *   [ C ] → [ B ] → [ A ] → null
 *
 *   pop() → "C" 반환, top이 B로 이동
 */
class Stack {
    constructor() {
        this.top = null; // 가장 나중에 들어온 노드 (삽입/삭제 방향)
        this._size = 0;
    }

    // 스택의 현재 요소 개수
    get size() {
        return this._size;
    }

    // 비어있는지 확인
    isEmpty() {
        return this.top === null;
    }

    /**
     * 삽입 (Push): top 앞에 새 노드를 추가 — O(1)
     */
    push(data) {
        const newNode = new Node(data);
        this._size++;
        newNode.next = this.top;
        this.top = newNode;
    }

    /**
     * 삭제 (Pop): top 노드를 꺼내 데이터를 반환 — O(1)
     * 스택이 비어있으면 null 반환
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        const data = this.top.data;
        this.top = this.top.next;
        this._size--;
        return data;
    }

    /**
     * 조회 (Peek): top의 데이터를 제거 없이 확인 — O(1)
     * 스택이 비어있으면 null 반환
     */
    peek() {
        return this.top ? this.top.data : null;
    }

    // 스택 상태를 문자열로 표현 (top → bottom 방향)
    toString() {
        let resStr = "top → |";
        let iterator = this.top;
        while (iterator !== null) {
            resStr += ` ${iterator.data} |`;
            iterator = iterator.next;
        }
        return resStr + " ← bottom";
    }
}

/**
 * 예시: 브라우저 뒤로가기 기능
 * - 페이지를 방문할 때마다 스택에 push
 * - 뒤로가기를 누르면 스택에서 pop하여 이전 페이지로 이동
 */
const 방문기록 = new Stack();

console.log("--- 1. 페이지 방문 (push) ---");
방문기록.push("google.com");
방문기록.push("github.com");
방문기록.push("codeit.com");
방문기록.push("stackoverflow.com");
console.log(방문기록.toString());
// top → | stackoverflow.com | codeit.com | github.com | google.com | ← bottom

console.log("\n--- 2. 현재 페이지 확인 (peek) ---");
console.log(`현재 페이지: ${방문기록.peek()}`); // stackoverflow.com
console.log(`(peek 후 방문기록 변화 없음) 현재 크기: ${방문기록.size}`); // 4

console.log("\n--- 3. 뒤로가기 (pop) ---");
console.log(`이전 페이지로: ${방문기록.pop()}`); // stackoverflow.com
console.log(`이전 페이지로: ${방문기록.pop()}`); // codeit.com
console.log(방문기록.toString());
// top → | github.com | google.com | ← bottom

console.log("\n--- 4. 새 페이지 방문 ---");
방문기록.push("npmjs.com");
console.log(방문기록.toString());
// top → | npmjs.com | github.com | google.com | ← bottom

console.log("\n--- 5. 남은 기록 모두 뒤로가기 ---");
while (!방문기록.isEmpty()) {
    console.log(`이전 페이지로: ${방문기록.pop()}`);
}
console.log(`방문기록 비어있음: ${방문기록.isEmpty()}`); // true

console.log("\n--- 6. 빈 스택에서 pop 시도 ---");
console.log(`결과: ${방문기록.pop()}`); // null