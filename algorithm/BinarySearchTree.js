/** 이진 탐색 트리의 노드 */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * 트리에 값을 추가합니다.
   * @param {number} value
   */
  insert(value) {
    this.root = this._insertNode(this.root, value);
  }

  /** 노드 삽입 재귀 보조 */
  _insertNode(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = this._insertNode(node.left, value);
    else if (value > node.value) node.right = this._insertNode(node.right, value);
    return node;
  }

  /**
   * 주어진 값을 가진 노드를 찾아 반환합니다. 없으면 null.
   * @param {number} value
   * @returns {TreeNode|null}
   */
  find(value) {
    return this._findNode(this.root, value);
  }

  /** 노드 탐색 재귀 보조 */
  _findNode(node, value) {
    if (!node || node.value === value) return node;
    if (value < node.value) return this._findNode(node.left, value);
    return this._findNode(node.right, value);
  }

  /**
   * 해당 값을 가진 노드를 삭제합니다.
   * @param {number} value
   * @returns {boolean} 삭제 성공 여부
   */
  remove(value) {
    if (!this.find(value)) return false;
    this.root = this._removeNode(this.root, value);
    return true;
  }

  /** 노드 삭제 재귀 보조 */
  _removeNode(node, value) {
    if (!node) return null;
    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    }
    if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    }
    if (!node.left && !node.right) return null;
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const minRight = this._minNode(node.right);
    node.value = minRight.value;
    node.right = this._removeNode(node.right, minRight.value);
    return node;
  }

  /** 오른쪽 서브트리에서 가장 작은 값의 노드 */
  _minNode(node) {
    let cur = node;
    while (cur.left) cur = cur.left;
    return cur;
  }
}

module.exports = BinarySearchTree;
