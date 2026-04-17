class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
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

  addToTail(value) {
    const newNode = new Node(value);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  findNode(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);
    if (targetNode === null) return;

    const newNode = new Node(newValue);

    if (targetNode === this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      newNode.next = targetNode.next;
      newNode.prev = targetNode;
      targetNode.next.prev = newNode;
      targetNode.next = newNode;
    }
  }

  removeNode(value) {
    const nodeToRemove = this.findNode(value);
    if (nodeToRemove === null) return;

    if (nodeToRemove === this.head && nodeToRemove === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (nodeToRemove === this.head) {
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
    } else if (nodeToRemove === this.tail) {
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
    } else {
      nodeToRemove.prev.next = nodeToRemove.next;
      nodeToRemove.next.prev = nodeToRemove.prev;
    }
  }
}

const list = new DoublyLinkedList();
list.addToTail(1);
list.addToTail(2);
list.addToTail(3);
list.addToHead(0);

console.log(list.findNode(2).value); // 2
console.log(list.findNode(2).prev.value); // 1

list.insertAfter(2, 2.5);
console.log(list.findNode(2).next.value); // 2.5

list.removeNode(2.5);
console.log(list.findNode(2).next.value); // 3
