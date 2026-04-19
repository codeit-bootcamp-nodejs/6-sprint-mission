// 큐의 각 요소를 저장할 노드 클래스
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

/**
 * 큐 (Queue) 구현하기
 * 목표: FIFO(First In, First Out) 구조를 연결 리스트로 구현
 */
class Queue {
    constructor() {
        this.front = null; // 데이터를 꺼내는 쪽 (가장 앞)
        this.rear = null; // 데이터를 넣는 쪽 (가장 뒤)
        this._size = 0;
    }

    // 큐의 현재 요소 개수 반환
    get size() {
        return this._size;
    }

    // 큐가 비어있는지 확인
    isEmpty() {
        // TODO: front 포인터를 확인하여 비어있는지 여부를 불리언으로 반환하세요.
        return this.front === null;
    }

    /**
     * 삽입 (Enqueue): rear 쪽에 새 노드를 추가 — O(1)
     */
    enqueue(data) {
        const newNode = new Node(data);
        this._size++;
        if (this.front === null) {
            this.front = newNode;
            this.rear = newNode;
        }
        else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
    }

    /**
     * 삭제 (Dequeue): front 쪽에서 노드를 꺼내 데이터를 반환 — O(1)
     */
    dequeue() {
        const data = this.front.data;
        this.front = this.front.next;
        this._size--;
        return data;
    }

    /**
     * 조회 (Peek): front의 데이터를 제거 없이 확인 — O(1)
     */
    peek() {
        // TODO: 큐가 비어있지 않다면 가장 앞(front)의 데이터를 반환하세요.
        if (this.isEmpty()) {
            return null;
        }
        return this.front.data;
    }

    // 내부 상태 확인을 위한 보조 메소드
    toString() {
        let resStr = "front → |";
        let iterator = this.front;
        while (iterator !== null) {
            resStr += ` ${iterator.data} |`;
            iterator = iterator.next;
        }
        return resStr + " ← rear";
    }
}

/**
 * 테스트 코드 (작성 후 아래 코드가 정상 작동하는지 확인하세요)
 */
const q = new Queue();
q.enqueue("Task 1");
q.enqueue("Task 2");
console.log(q.toString()); // front → | Task 1 | Task 2 | ← rear
console.log(q.dequeue()); // Task 1
console.log(q.peek()); // Task 2
console.log(q.size); // 1