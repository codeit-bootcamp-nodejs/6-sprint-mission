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
  }

  toString() {
    let resStr = '|';
    let iterator = this.head;
    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.next;
    }
    return resStr;
  }

  findNodeAt(index) {
    if (index < 0) return null;
    let iterator = this.head;
    for (let i = 0; i < index; i++) {
      if (iterator === null) return null;
      iterator = iterator.next;
    }
    return iterator;
  }

  findNode(value) {
    let iterator = this.head;
    while (iterator !== null) {
      if (iterator.data === value) return iterator;
      iterator = iterator.next;
    }
    return null;
  }

  addToTail(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  addToHead(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  insertAfter(targetValue, newValue) {
    const prevNode = this.findNode(targetValue);
    if (prevNode === null) return;

    const newNode = new Node(newValue);
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
  }

  removeNode(value) {
    const nodeToDelete = this.findNode(value);
    if (nodeToDelete === null) return null;

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

    return nodeToDelete.data;
  }
}

const list = new DoublyLinkedList();

// 1. addToTail - 리스트 뒤쪽에 노드 추가
list.addToTail(10);
list.addToTail(20);
list.addToTail(30);
console.log(list.toString()); // | 10 | 20 | 30 |

// 2. addToHead - 리스트 앞쪽에 노드 추가
list.addToHead(5);
list.addToHead(1);
console.log(list.toString()); // | 1 | 5 | 10 | 20 | 30 |

// 3. findNode - 값으로 노드 검색
const found = list.findNode(20);
console.log('found:', found.data); // found: 20

const notFound = list.findNode(99);
console.log('notFound:', notFound); // notFound: null

// 4. insertAfter - 특정 값 뒤에 새 노드 삽입
list.insertAfter(10, 15);
console.log(list.toString()); // | 1 | 5 | 10 | 15 | 20 | 30 |

list.insertAfter(30, 40);
console.log(list.toString()); // | 1 | 5 | 10 | 15 | 20 | 30 | 40 |

// 5. removeNode - 특정 값을 가진 노드 삭제
list.removeNode(1);
console.log(list.toString()); // | 5 | 10 | 15 | 20 | 30 | 40 |

list.removeNode(15);
console.log(list.toString()); // | 5 | 10 | 20 | 30 | 40 |

list.removeNode(40);
console.log(list.toString()); // | 5 | 10 | 20 | 30 |
