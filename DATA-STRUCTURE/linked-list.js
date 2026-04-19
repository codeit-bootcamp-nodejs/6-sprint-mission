

// 링크드 리스트의 노드 클래스
class Node {
    constructor(data) {
        this.data = data; // 실제 노드가 저장하는 데이터
        this.next = null; // 다음 노드에 대한 레퍼런스
    }
}

// 링크드 리스트 클래스
class LinkedList {
    constructor() {
        this.head = null; // 링크드 리스트의 가장 앞 노드
        this.tail = null; // 링크드 리스트의 가장 뒤 노드
        this._size = 0;
    }

    // 링크드 리스트를 문자열로 표현해서 리턴하는 메소드
    toString() {
        let resStr = "|";
        let iterator = this.head;

        while (iterator !== null) {
            resStr += ` ${iterator.data} |`;
            iterator = iterator.next;
        }

        return resStr;
    }

    // 주어진 인덱스에 있는 노드에 접근: 해당 인덱스의 노드가 항상 존재한다고 가정
    findNodeAt(index) {
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
            if (iterator.data === data) {
                return iterator;
            }
            iterator = iterator.next;
        }
        return null;
    }

    // 링크드 리스트에 데이터를 추가하는 메소드
    append(data) {
        const newNode = new Node(data);

        if (this.head === null) {
            // 링크드 리스트가 비어있을 때
            this.head = newNode; // 새로운 노드를 head와 tail로 설정
            this.tail = newNode;
        } else {
            // 링크드 리스트가 비어있지 않을 때
            this.tail.next = newNode; // tail 노드와 새로운 노드를 연결
            this.tail = newNode; // 새로운 노드를 tail 노드로 설정
        }
        this._size++;
    }

    // prevNode 뒤에 주어진 데이터를 저장하는 새로운 노드를 삽입
    insertAfter(prevNode, data) {
        const newNode = new Node(data);

        // tail 노드 뒤에 삽입하는 경우
        if (prevNode === this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            // 두 노드 사이에 삽입하는 경우
            newNode.next = prevNode.next;
            prevNode.next = newNode;
        }
        this._size++;
    }

    // 링크드 리스트의 가장 앞에 데이터 삽입
    prepend(data) {
        const newNode = new Node(data);

        if (this.head === null) {
            this.tail = newNode;
        } else {
            newNode.next = this.head;
        }
        this.head = newNode;
        this._size++;
    }

    // prevNode 다음 노드를 삭제: prevNode가 tail 노드가 아니라고 가정
    deleteAfter(prevNode) {
        const data = prevNode.next.data;
        prevNode.next = prevNode.next.next;

        // tail 노드를 삭제하는 경우
        if (prevNode.next === null) {
            this.tail = prevNode;
        }

        this._size--;
        return data;
    }

    // 링크드 리스트의 가장 앞 노드 삭제 메소드. 단, 링크드 리스트에 항상 노드가 있다고 가정
    popLeft() {
        const data = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }

        this._size--;
        return data;
    }

    getSize() {
        return this._size; // 시간복잡도 O(1)
    }
}

/**
 * 예시 코드
 */

// 1. 리스트 생성 (비어있는 상태)
const 인적사항 = new LinkedList();
console.log(인적사항.getSize());

console.log("--- 1. 뒤에 추가 (append) ---");
인적사항.append("철수");
인적사항.append("영희");
인적사항.append("민수");
console.log(인적사항.toString());
console.log(인적사항.getSize());
// 결과: | 철수 | 영희 | 민수 |

console.log("\n--- 2. 맨 앞에 추가 (prepend) ---");
인적사항.prepend("짱구");
console.log(인적사항.toString());
console.log(인적사항.getSize());
// 결과: | 짱구 | 철수 | 영희 | 민수 |

console.log("\n--- 3. 특정 위치 접근 (findNodeAt) ---");
const 두번째노드 = 인적사항.findNodeAt(2); // 인덱스 2: '영희'
console.log(`인덱스 2에 있는 사람: ${두번째노드.data}`);

console.log("\n--- 4. 데이터로 찾아서 중간에 삽입 (insertAfter) ---");
// '철수' 노드를 찾아서 그 바로 뒤에 '훈이'를 넣습니다.
const 철수노드 = 인적사항.findNodeWithData("철수");
if (철수노드) {
    인적사항.insertAfter(철수노드, "훈이");
}
console.log(인적사항.toString());
console.log(인적사항.getSize());
// 결과: | 짱구 | 철수 | 훈이 | 영희 | 민수 |

console.log("\n--- 5. 중간 노드 삭제 (deleteAfter) ---");
// '훈이' 노드를 찾아서 그 뒤에 있는 '영희'를 삭제합니다.
const 훈이노드 = 인적사항.findNodeWithData("훈이");
if (훈이노드) {
    const 삭제된사람 = 인적사항.deleteAfter(훈이노드);
    console.log(`삭제된 사람: ${삭제된사람}`);
}
console.log(인적사항.toString());
console.log(인적사항.getSize());
// 결과: | 짱구 | 철수 | 훈이 | 민수 |

console.log("\n--- 6. 맨 앞 노드 삭제 (popLeft) ---");
const 나간사람 = 인적사항.popLeft();
console.log(`리스트에서 나간 사람: ${나간사람}`);
console.log(인적사항.toString());
console.log(인적사항.getSize());
// 결과: | 철수 | 훈이 | 민수 |

console.log("\n--- 7. 현재 Head와 Tail 확인 ---");
console.log(`맨 앞(Head): ${인적사항.head.data}`);
console.log(`맨 뒤(Tail): ${인적사항.tail.data}`);

/**
 * 현재 리스트의 길이를 반환: getSize(): number
 *
 */