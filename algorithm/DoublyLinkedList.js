/** 이중 연결 리스트의 노드 */
class DListNode {
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

  /**
   * 리스트 앞쪽(head)에 노드를 추가합니다.
   * @param {*} value
   */
  addToHead(value) {
    const node = new DListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  /**
   * 리스트 뒤쪽(tail)에 노드를 추가합니다.
   * @param {*} value
   */
  addToTail(value) {
    const node = new DListNode(value);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  /**
   * 주어진 값을 가지는 노드를 찾아 반환합니다. 없으면 null.
   * @param {*} value
   * @returns {DListNode|null}
   */
  findNode(value) {
    let cur = this.head;
    while (cur) {
      if (cur.value === value) return cur;
      cur = cur.next;
    }
    return null;
  }

  /**
   * targetValue를 가진 노드 뒤에 newValue 노드를 삽입합니다.
   * @param {*} targetValue
   * @param {*} newValue
   * @returns {boolean}
   */
  insertAfter(targetValue, newValue) {
    const target = this.findNode(targetValue);
    if (!target) return false;
    const node = new DListNode(newValue);
    node.prev = target;
    node.next = target.next;
    if (target.next) target.next.prev = node;
    else this.tail = node;
    target.next = node;
    return true;
  }

  /**
   * 특정 값을 가진 노드를 삭제합니다.
   * @param {*} value
   * @returns {boolean} 삭제 성공 여부
   */
  removeNode(value) {
    const node = this.findNode(value);
    if (!node) return false;
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
    return true;
  }
}

module.exports = DoublyLinkedList;
