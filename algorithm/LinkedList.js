class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
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
    newNode.next = targetNode.next;
    targetNode.next = newNode;

    if (targetNode === this.tail) {
      this.tail = newNode;
    }
  }

  removeAfter(targetValue) {
    const targetNode = this.findNode(targetValue);
    if (targetNode === null || targetNode.next === null) return;

    const nodeToRemove = targetNode.next;
    targetNode.next = nodeToRemove.next;

    if (nodeToRemove === this.tail) {
      this.tail = targetNode;
    }
  }
}

const list = new LinkedList();
list.addNode(1);
list.addNode(2);
list.addNode(3);

console.log(list.findNode(2)); // Node { value: 2, next: Node { value: 3, ... } }

list.insertAfter(2, 2.5);
console.log(list.findNode(2).next.value); // 2.5

list.removeAfter(2);
console.log(list.findNode(2).next.value); // 3
