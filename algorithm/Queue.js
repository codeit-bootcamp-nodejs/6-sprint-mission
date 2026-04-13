class Queue {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * 큐의 마지막에 값을 추가합니다.
   * @param {*} value
   */
  enqueue(value) {
    const node = { value, next: null };
    if (!this._tail) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      this._tail = node;
    }
    this._size++;
  }

  /**
   * 큐의 앞에서 값을 제거하고 그 값을 반환합니다. 비어 있으면 undefined.
   * @returns {*|undefined}
   */
  dequeue() {
    if (!this._head) return undefined;
    const { value } = this._head;
    this._head = this._head.next;
    if (!this._head) this._tail = null;
    this._size--;
    return value;
  }

  /**
   * 큐의 앞에 있는 값을 제거하지 않고 반환합니다. 비어 있으면 undefined.
   * @returns {*|undefined}
   */
  peek() {
    return this._head ? this._head.value : undefined;
  }

  /**
   * 큐가 비어 있는지 여부를 반환합니다.
   * @returns {boolean}
   */
  isEmpty() {
    return this._size === 0;
  }
}

module.exports = Queue;
