// ======================================
// ----------- 스프린트 미션 13 -----------
// ======================================

// 이중 링크드 리스트 (Doubly Linked List)

// 메서드:
//   - addToHead(value): 리스트의 앞쪽에 노드 추가
//   - addToTail(value): 리스트의 뒤쪽에 노드 추가
//   - insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
//   - findNode(value): 값을 가진 노드를 찾아 반환
//   - removeNode(value): 특정 값을 가진 노드 삭제

// 핵심 키워드 :
// - Bidirectional(양방향): 각 노드가 `next` 뿐만 아니라 `prev` 포인터를 가져 양방향 탐색이 가능
// - Tail(테일): 리스트의 마지막 노드. 테일을 관리하면 리스트 끝에 데이터를 추가할 때 O(1)로 처리가 가능
// - Prev Pointer: 이전 노드의 위치를 가리키며, 이 덕분에 특정 노드의 삭제를 O(1)에 수행할 수 있음

class DoublyNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // addToHead(value): 리스트의 앞쪽에 노드 추가
  addToHead(value) {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  // addToTail(value): 리스트의 뒤쪽에 노드 추가
  addToTail(value) {
    const newNode = new DoublyNode(value);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }

  // findNode(value): 값을 가진 노드를 찾아 반환
  findNode(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  // insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);
    if (!targetNode) {
      console.warn(`Target node with value "${targetValue}" not found.`);
      return;
    }

    const newNode = new DoublyNode(newValue);
    newNode.next = targetNode.next;
    newNode.prev = targetNode;

    if (targetNode.next) {
      targetNode.next.prev = newNode;
    } else {
      // 타겟이 마지막 노드였을 경우 tail 업데이트
      this.tail = newNode;
    }

    targetNode.next = newNode;
  }

  // removeNode(value): 특정 값을 가진 노드 삭제
  removeNode(value) {
    const nodeToRemove = this.findNode(value);
    if (!nodeToRemove) return;

    // 헤드인 경우 처리
    if (nodeToRemove === this.head) {
      this.head = nodeToRemove.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null; // 리스트가 비게 된 경우
      }
    }
    // 테일인 경우 처리
    else if (nodeToRemove === this.tail) {
      this.tail = nodeToRemove.prev;
      this.tail.next = null;
    }
    // 중간 노드인 경우 처리
    else {
      nodeToRemove.prev.next = nodeToRemove.next;
      nodeToRemove.next.prev = nodeToRemove.prev;
    }

    // 메모리 해제 보조
    nodeToRemove.prev = null;
    nodeToRemove.next = null;
  }

  // 전체 리스트 출력 (앞에서부터)
  printForward() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log("Forward: ", values.join(" <-> ") || "Empty");
  }

  // 전체 리스트 출력 (뒤에서부터)
  printBackward() {
    let current = this.tail;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.prev;
    }
    console.log("Backward: ", values.join(" <-> ") || "Empty");
  }
}

// ======================================
// 테스트 코드 (검증)
// ======================================

const dList = new DoublyLinkedList();
console.log("--- addToHead & addToTail Test : [5, 10, 15, 20, 25] 만들기 ---");
dList.addToHead(5);
dList.addToTail(10);
dList.addToTail(15);
dList.addToTail(20);
dList.addToTail(25);
dList.printForward();
dList.printBackward();

console.log("\n--- insertAfter Test : [value: 10] 뒤에 [value: 12] 추가 ---");
dList.insertAfter(10, 12);
dList.printForward();

console.log("\n--- removeNode Test : [value: 10] 삭제 ---");
dList.removeNode(10);
dList.printForward();
dList.printBackward();

console.log("\n--- removeNode Test : [value: 5] 삭제(Head 삭제) ---");
dList.removeNode(5);
dList.printForward();

console.log("\n--- removeNode Test : [value: 25] 삭제(Tail 삭제) ---");
dList.removeNode(25);
dList.printForward();
