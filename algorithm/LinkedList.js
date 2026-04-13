class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
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
    let iterator = this.head;
    for (let i = 0; i < index; i++) {
      iterator = iterator.next;
    }
    return iterator;
  }

  findNode(value) {
    let iterator = this.head;
    while (iterator !== null) {
      if (iterator.data === value) {
        return iterator;
      }
      iterator = iterator.next;
    }
    return null;
  }

  addNode(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  insertAfter(targetValue, newValue) {
    const prevNode = this.findNode(targetValue);
    if (prevNode === null) return;

    const newNode = new Node(newValue);
    if (prevNode === this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      newNode.next = prevNode.next;
      prevNode.next = newNode;
    }
    this._size++;
  }

  removeAfter(targetValue) {
    const prevNode = this.findNode(targetValue);
    if (prevNode === null || prevNode.next === null) return null;

    const data = prevNode.next.data;
    prevNode.next = prevNode.next.next;
    if (prevNode.next === null) {
      this.tail = prevNode;
    }
    this._size--;
    return data;
  }

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
    return this._size;
  }
}

//예시
const list = new LinkedList();

// 1. addNode - 리스트 끝에 노드 추가
list.addNode(10);
list.addNode(20);
list.addNode(30);
console.log(list.toString()); // | 10 | 20 | 30 |
console.log('size:', list.getSize()); // size: 3

// 2. findNode - 값으로 노드 검색
const found = list.findNode(20);
console.log('found:', found.data); // found: 20

const notFound = list.findNode(99);
console.log('notFound:', notFound); // notFound: null

// 3. insertAfter - 특정 값 뒤에 새 노드 삽입
list.insertAfter(20, 25);
console.log(list.toString()); // | 10 | 20 | 25 | 30 |
console.log('size:', list.getSize()); // size: 4

list.insertAfter(30, 40);
console.log(list.toString()); // | 10 | 20 | 25 | 30 | 40 |
console.log('size:', list.getSize()); // size: 5

// 4. removeAfter - 특정 값 뒤의 노드 삭제
const removed = list.removeAfter(20);
console.log('removed:', removed); // removed: 25
console.log(list.toString()); // | 10 | 20 | 30 | 40 |
console.log('size:', list.getSize()); // size: 4

list.removeAfter(30);
console.log(list.toString()); // | 10 | 20 | 30 |
console.log('size:', list.getSize()); // size: 3
