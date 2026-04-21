/*
addNode(value): 리스트의 끝에 새 노드를 추가
findNode(value): 주어진 값을 가지는 노드를 찾아 리턴
insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
removeAfter(targetValue): 특정 값을 가진 노드 뒤의 노드를 삭제
*/

// Node 클래스
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// LinkedList 클래스
class LinkedList {
  constructor() {
    this.head = null; // 리스트의 시작 노드
    this.tail = null; // 리스트의 끝 노드
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

  // 리스트의 끝에 새 노드 추가
  addNode(data) {
    const newNode = new Node(data);
    // 리스트가 비어있는 경우
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 리스트가 비어있지 않은 경우
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  // 주어진 값을 가지는 노드를 찾아 리턴
  findNode(data) {
    let current = this.head;
    // 리스트를 순회하면서 노드를 찾음
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
    // targetData를 가진 노드를 찾음
    const targetNode = this.findNode(targetData);
    const newNode = new Node(newData);
    // targetNode가 존재하는 경우
    if (targetNode) {
      newNode.next = targetNode.next;
      targetNode.next = newNode;
      // targetNode가 리스트의 끝인 경우
      if (targetNode === this.tail) {
        this.tail = newNode;
      }
    }
  }
  // 특정 값을 가진 노드 뒤의 노드를 삭제
  removeAfter(targetData) {
    const targetNode = this.findNode(targetData);
    // targetNode가 존재하는 경우
    if (targetNode && targetNode.next) {
      const nodeToRemove = targetNode.next;
      targetNode.next = nodeToRemove.next;
      // targetNode가 리스트의 끝인 경우
      if (nodeToRemove === this.tail) {
        this.tail = targetNode;
      }
    }
  }
}

// 예시 사용
const list = new LinkedList();
// 노드 추가
list.addNode("A");
list.addNode("B");
list.addNode("C");
// 노드 확인
console.log(list.toString());
// 노드 찾기
console.log(list.findNode("B"));
// 노드 삽입
list.insertAfter("B", "D");
console.log(list.toString());
// 노드 삭제
list.removeAfter("B");
console.log(list.toString());
