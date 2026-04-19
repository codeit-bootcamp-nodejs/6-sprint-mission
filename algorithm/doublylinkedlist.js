// Node 클래스: 이중 연결 리스트의 각 요소를 나타냅니다.
class Node {
    constructor(value) {
        this.value = value; // 노드가 저장할 값
        this.next = null;   // 다음 노드를 가리키는 포인터
        this.prev = null;   // 이전 노드를 가리키는 포인터
    }
}

// DoublyLinkedList 클래스: 이중 연결 리스트를 구현합니다.
class DoublyLinkedList {
    constructor() {
        this.head = null; // 리스트의 첫 번째 노드를 가리키는 포인터
        this.tail = null; // 리스트의 마지막 노드를 가리키는 포인터
    }

    /**
     * 리스트의 앞쪽에 노드를 추가합니다. (prepend)
     * 시간 복잡도: O(1)
     * @param {*} value - 추가할 노드의 값
     */
    addToHead(value) {
        const newNode = new Node(value); // 새 노드 생성
        // 리스트가 비어있다면, 새 노드가 head와 tail이 됩니다.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head; // 새 노드의 next는 현재 head를 가리킴
            this.head.prev = newNode; // 현재 head의 prev는 새 노드를 가리킴
            this.head = newNode;      // head를 새 노드로 업데이트
        }
    }

    /**
     * 리스트의 뒤쪽에 노드를 추가합니다. (append)
     * 시간 복잡도: O(1)
     * @param {*} value - 추가할 노드의 값
     */
    addToTail(value) {
        const newNode = new Node(value); // 새 노드 생성
        // 리스트가 비어있다면, 새 노드가 head와 tail이 됩니다.
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail; // 새 노드의 prev는 현재 tail을 가리킴
            this.tail.next = newNode; // 현재 tail의 next는 새 노드를 가리킴
            this.tail = newNode;      // tail을 새 노드로 업데이트
        }
    }

    /**
     * 특정 값을 가진 노드 뒤에 새 노드를 추가합니다.
     * 시간 복잡도: O(N) - targetNode를 찾기 위해 리스트를 순회할 수 있습니다.
     * @param {*} targetValue - 새 노드를 삽입할 대상 노드의 값
     * @param {*} newValue - 삽입할 새 노드의 값
     */
    insertAfter(targetValue, newValue) {
        const targetNode = this.findNode(targetValue); // 대상 노드를 찾습니다.
        if (targetNode) {
            const newNode = new Node(newValue); // 새 노드 생성

            // 새 노드의 다음/이전 포인터 설정
            newNode.next = targetNode.next; // 새 노드의 next는 대상 노드의 next를 가리킴
            newNode.prev = targetNode;      // 새 노드의 prev는 대상 노드를 가리킴

            // 대상 노드의 다음 노드가 존재한다면, 그 노드의 prev를 새 노드로 설정
            if (targetNode.next) {
                targetNode.next.prev = newNode;
            } else { // 대상 노드가 tail이었다면, 새 노드가 새로운 tail이 됩니다.
                this.tail = newNode;
            }
            targetNode.next = newNode; // 대상 노드의 next를 새 노드로 설정
        }
    }

    /**
     * 주어진 값을 가지는 노드를 찾아 반환합니다.
     * 시간 복잡도: O(N) - 최악의 경우 리스트 전체를 탐색해야 합니다.
     * @param {*} value - 찾을 노드의 값
     * @returns {Node|null} - 찾은 노드 또는 null (찾지 못한 경우)
     */
    findNode(value) {
        let current = this.head; // 현재 노드를 head부터 시작
        while (current) {
            if (current.value === value) { // 값을 찾으면 해당 노드 반환
                return current;
            }
            current = current.next; // 다음 노드로 이동
        }
        return null; // 리스트 끝까지 찾지 못하면 null 반환
    }

    /**
     * 특정 값을 가진 노드를 리스트에서 삭제합니다.
     * 시간 복잡도: O(N) - targetNode를 찾기 위해 리스트를 순회할 수 있습니다. (findNode 호출 때문)
     * @param {*} value - 삭제할 노드의 값
     */
    removeNode(value) {
        const targetNode = this.findNode(value); // 삭제할 대상 노드를 찾습니다.
        if (!targetNode) return; // 대상 노드가 없으면 아무것도 하지 않습니다.

        // 케이스 1: 대상 노드가 head인 경우
        if (targetNode === this.head) {
            this.head = targetNode.next;
            if (this.head) this.head.prev = null; // 새 head가 있다면, prev를 null로 설정
        }
        // 케이스 2: 대상 노드가 tail인 경우
        else if (targetNode === this.tail) {
            this.tail = targetNode.prev;
            if (this.tail) this.tail.next = null; // 새 tail이 있다면, next를 null로 설정
        }
        // 케이스 3: 대상 노드가 head도 tail도 아닌 중간 노드인 경우
        else {
            // 대상 노드의 이전 노드가 대상 노드의 다음 노드를 가리키게 함
            targetNode.prev.next = targetNode.next;
            // 대상 노드의 다음 노드가 대상 노드의 이전 노드를 가리키게 함
            targetNode.next.prev = targetNode.prev;
        }
    }
}

module.exports = DoublyLinkedList;