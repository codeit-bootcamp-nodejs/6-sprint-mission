// Node 클래스: 연결 리스트의 각 요소를 나타냅니다.
class Node {
    constructor(value) {
        this.value = value; // 노드가 저장할 값
        this.next = null;   // 다음 노드를 가리키는 포인터 (참조)
    }
}

// LinkedList 클래스: 단일 연결 리스트를 구현합니다.
class LinkedList {
    constructor() {
        this.head = null; // 리스트의 첫 번째 노드를 가리키는 포인터
    }

    /**
     * 리스트의 끝에 새 노드를 추가합니다. (append)
     * 시간 복잡도: O(N) - 최악의 경우 리스트 전체를 탐색해야 합니다.
     * @param {*} value - 추가할 노드의 값
     */
    addNode(value) {
        const newNode = new Node(value); // 새 노드 생성
        // 리스트가 비어있다면, 새 노드가 head가 됩니다.
        if (!this.head) {
            this.head = newNode;
            return;
        }
        // 리스트가 비어있지 않다면, 마지막 노드를 찾기 위해 순회합니다.
        let current = this.head; // 현재 노드를 head부터 시작
        while (current.next) {
            current = current.next; // 다음 노드가 존재하면 계속 이동
        }
        current.next = newNode; // 마지막 노드의 next가 새 노드를 가리키도록 설정
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
     * 특정 값을 가진 노드 뒤에 새 노드를 추가합니다.
     * 시간 복잡도: O(N) - targetNode를 찾기 위해 리스트를 순회할 수 있습니다.
     * @param {*} targetValue - 새 노드를 삽입할 대상 노드의 값
     * @param {*} newValue - 삽입할 새 노드의 값
     */
    insertAfter(targetValue, newValue) {
        const targetNode = this.findNode(targetValue); // 대상 노드를 찾습니다.
        if (targetNode) {
            const newNode = new Node(newValue); // 새 노드 생성
            // 새 노드의 next가 대상 노드의 다음 노드를 가리키도록 설정
            newNode.next = targetNode.next;
            // 대상 노드의 next가 새 노드를 가리키도록 설정
            targetNode.next = newNode;
        }
    }

    /**
     * 특정 값을 가진 노드 바로 뒤에 있는 노드를 삭제합니다.
     * (예: A -> B -> C 에서 targetValue가 'A'라면 'B'를 삭제하여 A -> C 로 만듭니다.)
     * 시간 복잡도: O(N) - targetNode를 찾기 위해 리스트를 순회할 수 있습니다.
     * @param {*} targetValue - 뒤 노드를 삭제할 대상 노드의 값
     */
    removeAfter(targetValue) {
        const targetNode = this.findNode(targetValue); // 대상 노드를 찾습니다.
        if (targetNode && targetNode.next) { // 대상 노드가 존재하고, 그 뒤에 삭제할 노드가 있다면
            // 대상 노드의 next를, 그 다음 노드의 next로 설정하여 중간 노드를 건너뛰게 합니다.
            targetNode.next = targetNode.next.next;
        }
    }
}

module.exports = LinkedList;