class Stack {
  constructor() {
    this._items = [];
  }

  /**
   * 스택의 맨 위에 값을 추가합니다.
   * @param {*} value
   */
  push(value) {
    this._items.push(value);
  }

  /**
   * 스택의 맨 위 값을 제거하고 반환합니다. 비어 있으면 undefined.
   * @returns {*|undefined}
   */
  pop() {
    return this._items.pop();
  }

  /**
   * 스택의 맨 위 값을 제거하지 않고 반환합니다. 비어 있으면 undefined.
   * @returns {*|undefined}
   */
  peek() {
    const n = this._items.length;
    return n ? this._items[n - 1] : undefined;
  }

  /**
   * 스택이 비어 있는지 여부를 반환합니다.
   * @returns {boolean}
   */
  isEmpty() {
    return this._items.length === 0;
  }
}

module.exports = Stack;
