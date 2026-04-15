class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }

  addNode(value) {
    const newNode = new LinkedListNode(value);

    if (this.head === null) {
      this.head = newNode;
      return newNode;
    }

    let currentNode = this.head;

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }

    currentNode.next = newNode;
    return newNode;
  }

  findNode(value) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);

    if (targetNode === null) {
      return null;
    }

    const newNode = new LinkedListNode(newValue);
    newNode.next = targetNode.next;
    targetNode.next = newNode;

    return newNode;
  }

  removeAfter(targetValue) {
    const targetNode = this.findNode(targetValue);

    if (targetNode === null || targetNode.next === null) {
      return null;
    }

    const removedNode = targetNode.next;
    targetNode.next = removedNode.next;
    removedNode.next = null;

    return removedNode;
  }
}
