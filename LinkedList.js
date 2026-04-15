class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // 리스트의 끝에 새 노드를 추가
  addNode(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // 주어진 값을 가지는 노드를 찾아 리턴
  findNode(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null; // 찾지 못한 경우
  }

  // 특정 값을 가진 노드 뒤에 새 노드 추가
  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);
    if (targetNode) {
      const newNode = new Node(newValue);
      newNode.next = targetNode.next;
      targetNode.next = newNode;
    }
  }

  // 특정 값을 가진 노드 뒤의 노드를 삭제
  removeAfter(targetValue) {
    const targetNode = this.findNode(targetValue);
    if (targetNode && targetNode.next) {
      targetNode.next = targetNode.next.next;
    }
  }
}

module.exports = LinkedList;

if (require.main === module) {
  const list = new LinkedList();
  console.log("find (empty):", list.findNode(1));

  list.addNode(1);
  list.addNode(2);
  list.addNode(4);
  console.log("find 2:", list.findNode(2)?.value);

  list.insertAfter(2, 3);
  console.log("after insertAfter(2,3):", list.findNode(3)?.value);

  list.removeAfter(3); // removes 4
  console.log("find 4 (removed):", list.findNode(4));
}
