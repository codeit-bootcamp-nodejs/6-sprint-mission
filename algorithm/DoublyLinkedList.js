class DoublyLinkedListNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToHead(value) {
    const newNode = new DoublyLinkedListNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return newNode;
    }

    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;

    return newNode;
  }

  addToTail(value) {
    const newNode = new DoublyLinkedListNode(value);

    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
      return newNode;
    }

    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;

    return newNode;
  }

  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);

    if (targetNode === null) {
      return null;
    }

    const newNode = new DoublyLinkedListNode(newValue);
    const nextNode = targetNode.next;

    newNode.prev = targetNode;
    newNode.next = nextNode;
    targetNode.next = newNode;

    if (nextNode !== null) {
      nextNode.prev = newNode;
    } else {
      this.tail = newNode;
    }

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

  removeNode(value) {
    const targetNode = this.findNode(value);

    if (targetNode === null) {
      return null;
    }

    if (targetNode.prev !== null) {
      targetNode.prev.next = targetNode.next;
    } else {
      this.head = targetNode.next;
    }

    if (targetNode.next !== null) {
      targetNode.next.prev = targetNode.prev;
    } else {
      this.tail = targetNode.prev;
    }

    targetNode.prev = null;
    targetNode.next = null;

    return targetNode;
  }
}
