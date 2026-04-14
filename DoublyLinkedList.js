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

  // 리스트의 앞쪽에 노드 추가
  addToHead(value) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  // 리스트의 뒤쪽에 노드 추가
  addToTail(value) {
    const newNode = new DoublyNode(value);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // 값을 가진 노드를 찾아 반환
  findNode(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  // 특정 값을 가진 노드 뒤에 새 노드 추가
  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);
    if (targetNode) {
      const newNode = new DoublyNode(newValue);
      newNode.next = targetNode.next;
      newNode.prev = targetNode;

      if (targetNode.next) {
        targetNode.next.prev = newNode;
      } else {
        this.tail = newNode; // 마지막 노드였다면 tail 업데이트
      }
      targetNode.next = newNode;
    }
  }

  // 특정 값을 가진 노드 삭제
  removeNode(value) {
    const targetNode = this.findNode(value);
    if (!targetNode) return;

    if (targetNode.prev) {
      targetNode.prev.next = targetNode.next;
    } else {
      this.head = targetNode.next; // 삭제할 노드가 head인 경우
    }

    if (targetNode.next) {
      targetNode.next.prev = targetNode.prev;
    } else {
      this.tail = targetNode.prev; // 삭제할 노드가 tail인 경우
    }
  }
}

module.exports = DoublyLinkedList;
