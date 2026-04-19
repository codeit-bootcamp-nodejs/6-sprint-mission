/**
 * 클래스 이름: DoublyLinkedList
 * addToHead(value): 리스트의 앞쪽에 노드 추가
 * addToTail(value): 리스트의 뒤쪽에 노드 추가
 * insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
 * findNode(value): 값을 가진 노드를 찾아 반환합니다.
 * removeNode(value): 특정 값을 가진 노드 삭제
 */

class Node {
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
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  // 리스트의 뒤쪽에 노드 추가
  addToTail(value) {
    const newNode = new Node(value);
    if (!this.tail) {
      this.head = this.tail = newNode;
      return;
    }
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
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
    if (!targetNode) return false;

    const newNode = new Node(newValue);
    newNode.prev = targetNode;
    newNode.next = targetNode.next;

    if (targetNode.next) {
      targetNode.next.prev = newNode;
    } else {
      this.tail = newNode; // 마지막 노드인 경우 tail 업데이트
    }
    targetNode.next = newNode;
    return true;
  }

  // 특정 값을 가진 노드 삭제
  removeNode(value) {
    const node = this.findNode(value);
    if (!node) return false;

    if (node === this.head) {
      this.head = node.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
    } else if (node === this.tail) {
      this.tail = node.prev;
      this.tail.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    return true;
  }
}
