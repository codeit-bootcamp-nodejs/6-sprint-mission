class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0; // 3. getSize 효율화를 위한 상태 변수
    }

    // 1. insertBefore(nextNode, data): 특정 노드 앞에 새로운 노드 삽입
    insertBefore(nextNode, data) {
        // nextNode가 head라면 prepend와 동일한 로직
        if (nextNode === this.head) {
            this.prepend(data);
            return;
        }

        const newNode = new Node(data);
        const prevNode = nextNode.prev;

        // 새로운 노드의 양방향 연결
        newNode.next = nextNode;
        newNode.prev = prevNode;

        // 기존 노드들의 연결 수정
        prevNode.next = newNode;
        nextNode.prev = newNode;

        this._size++;
    }

    // 2. removeAt(index): 인덱스 기반 삭제 (O(n))
    removeAt(index) {
        // 인덱스 범위 밖인 경우 처리
        if (index < 0 || index >= this._size) {
            return null;
        }

        // 인덱스로 해당 노드를 찾음
        const nodeToDelete = this.findNodeAt(index);

        // 기존에 구현된 delete 메소드를 활용해 삭제 수행
        return this.delete(nodeToDelete);
    }

    // 3. getSize(): 리스트의 길이를 즉시 반환 (O(1))
    getSize() {
        return this._size;
    }

    append(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this._size++;
    }

    prepend(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this._size++;
    }

    insertAfter(prevNode, data) {
        const newNode = new Node(data);
        if (prevNode === this.tail) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        } else {
            newNode.next = prevNode.next;
            newNode.prev = prevNode;
            prevNode.next.prev = newNode;
            prevNode.next = newNode;
        }
        this._size++;
    }

    delete(nodeToDelete) {
        if (!nodeToDelete) return null;

        if (nodeToDelete === this.head && nodeToDelete === this.tail) {
            this.head = null;
            this.tail = null;
        } else if (nodeToDelete === this.head) {
            this.head = this.head.next;
            if (this.head) this.head.prev = null;
        } else if (nodeToDelete === this.tail) {
            this.tail = this.tail.prev;
            if (this.tail) this.tail.next = null;
        } else {
            nodeToDelete.prev.next = nodeToDelete.next;
            nodeToDelete.next.prev = nodeToDelete.prev;
        }

        this._size--;
        return nodeToDelete.data;
    }

    findNodeAt(index) {
        if (index < 0 || index >= this._size) return null;
        let iterator = this.head;
        for (let i = 0; i < index; i++) {
            iterator = iterator.next;
        }
        return iterator;
    }

    // 주어진 데이터를 가진 첫 번째 노드를 찾음: 노드를 찾지 못하면 null 반환
    findNodeWithData(data) {
        let iterator = this.head;
        while (iterator !== null) {
            if (iterator.data === data) return iterator;
            iterator = iterator.next;
        }
        return null;
    }

    toString() {
        let resStr = "|";
        let iterator = this.head;
        while (iterator !== null) {
            resStr += ` ${iterator.data} |`;
            iterator = iterator.next;
        }
        return resStr;
    }
}

/**
 * 예시 코드 실행
 */
const 인적사항 = new DoublyLinkedList();

console.log("--- 1. 뒤에 추가 (append) ---");
인적사항.append("철수");
인적사항.append("영희");
인적사항.append("민수");
console.log(`${인적사항.toString()}`);
// 결과: | 철수 | 영희 | 민수 |

console.log("\n--- 2. 맨 앞에 추가 (prepend) ---");
인적사항.prepend("짱구");
console.log(인적사항.toString());
// 결과: | 짱구 | 철수 | 영희 | 민수 |

console.log("\n--- 3. 특정 위치 접근 (findNodeAt) ---");
const 두번째노드 = 인적사항.findNodeAt(2); // 인덱스 2: '영희'
console.log(`인덱스 2에 있는 사람: ${두번째노드.data}`);
console.log(`그 앞 사람(prev): ${두번째노드.prev.data}`); // '철수'가 나와야 함

console.log("\n--- 4. 데이터로 찾아서 중간에 삽입 (insertAfter) ---");
const 철수노드 = 인적사항.findNodeWithData("철수");
if (철수노드) {
    인적사항.insertAfter(철수노드, "훈이");
}
console.log(인적사항.toString());
// 결과: | 짱구 | 철수 | 훈이 | 영희 | 민수 |

console.log("\n--- 5. 특정 노드 삭제 (delete) ---");
// '훈이' 노드를 찾아서 '훈이' 자체를 삭제합니다.
const 훈이노드 = 인적사항.findNodeWithData("훈이");
if (훈이노드) {
    const 삭제된사람 = 인적사항.delete(훈이노드);
    console.log(`삭제된 사람: ${삭제된사람}`);
}
console.log(인적사항.toString());
// 결과: | 짱구 | 철수 | 영희 | 민수 |

console.log("\n--- 6. 양끝 삭제 검증 (Head & Tail) ---");
인적사항.delete(인적사항.head); // 짱구 삭제
인적사항.delete(인적사항.tail); // 민수 삭제
console.log(인적사항.toString());
// 결과: | 철수 | 영희 |

console.log("\n--- 7. insertBefore 검증 ---");
const 영희노드 = 인적사항.findNodeWithData("영희");
인적사항.insertBefore(영희노드, "순이");
console.log(인적사항.toString());

console.log("\n--- 8. removeAt 검증 ---");
인적사항.removeAt(1);
console.log(인적사항.toString());

console.log("\n--- 7. 최종 연결성 확인 ---");
console.log(인적사항.getSize());
console.log(`현재 Head: ${인적사항.head.data}`);
console.log(`현재 Tail: ${인적사항.tail.data}`);
console.log(`Tail의 이전 노드(prev): ${인적사항.tail.prev.data}`); // '철수'가 나와야 함