/*
addToHead(value): 리스트의 앞쪽에 노드 추가
addToTail(value): 리스트의 뒤쪽에 노드 추가
insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
findNode(value): 값을 가진 노드를 찾아 반환합니다.
removeNode(value): 특정 값을 가진 노드 삭제
*/

// Node 클래스
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null; // 이전 노드에 대한 참조
    this.next = null; // 다음 노드에 대한 참조
  }
}

// DoublyLinkedList 클래스
class DoublyLinkedList {
  constructor() {
    this.head = null; // 리스트의 시작 노드
    this.tail = null; // 리스트의 끝 노드
  }

  // 더블 링크드 리스트를 문자열로 표현해서 리턴하는 메소드
  toString() {
    let resStr = "|";
    let iterator = this.head;

    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.next;
    }

    return resStr;
  }

  // 리스트의 앞쪽에 새 노드 추가
  addToHead(data) {
    const newNode = new Node(data);
    // 리스트가 비어있는 경우
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 리스트가 비어있지 않은 경우
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  // 리스트의 뒤쪽에 새 노드 추가
  addToTail(data) {
    const newNode = new Node(data);
    // 리스트가 비어있는 경우
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 리스트가 비어있지 않은 경우
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // 특정 값을 가진 노드를 찾아 리턴
  findNode(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  // 특정 값을 가진 노드 뒤에 새 노드 추가
  insertAfter(targetData, newData) {
    const targetNode = this.findNode(targetData);
    if (!targetNode) {
      return; // targetData를 가진 노드가 없는 경우
    }
    const newNode = new Node(newData);
    newNode.prev = targetNode;
    newNode.next = targetNode.next;
    // targetNode이 리스트의 끝인 경우
    if (targetNode.next) {
      targetNode.next.prev = newNode;
    } else {
      this.tail = newNode;
    }
    targetNode.next = newNode;
  }
  // 특정 값을 가진 노드 삭제
  removeNode(data) {
    const targetNode = this.findNode(data);
    if (!targetNode) {
      return; // data를 가진 노드가 없는 경우
    }

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

// 예시 사용
const list = new DoublyLinkedList();
list.addToHead(10);
list.addToTail(20);
list.addToTail(30);
console.log(list.findNode(20));
console.log(list.toString()); // | 10 | 20 | 30 |
list.insertAfter(20, 25);
console.log(list.toString()); // | 10 | 20 | 25 | 30 |
list.removeNode(20);
console.log(list.toString()); // | 10 | 25 | 30 |
