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
    else if (value > node.value)
      node.right = this._insertNode(node.right, value);
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

/** 반복문 기반 이진 탐색 트리 구현 */
class IterativeBinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }
    let cur = this.root;
    while (true) {
      if (value < cur.value) {
        if (!cur.left) {
          cur.left = node;
          return;
        }
        cur = cur.left;
      } else if (value > cur.value) {
        if (!cur.right) {
          cur.right = node;
          return;
        }
        cur = cur.right;
      } else {
        return;
      }
    }
  }

  find(value) {
    let cur = this.root;
    while (cur) {
      if (cur.value === value) return cur;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return null;
  }

  remove(value) {
    if (!this.find(value)) return false;
    this.root = this._removeNode(this.root, value);
    return true;
  }

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
    let succ = node.right;
    while (succ.left) succ = succ.left;
    node.value = succ.value;
    node.right = this._removeNode(node.right, succ.value);
    return node;
  }
}

module.exports = BinarySearchTree;
module.exports.IterativeBinarySearchTree = IterativeBinarySearchTree;

if (require.main === module) {
  // 1) 재귀 기반 BST 동작 확인
  const bst = new BinarySearchTree();
  console.log("find (empty):", bst.find(10));

  // 2) 샘플 데이터 삽입 후 탐색 동작 확인
  [5, 3, 7, 2, 4, 6, 8].forEach((v) => bst.insert(v));
  console.log("find 6:", bst.find(6)?.value);
  console.log("find 9:", bst.find(9));

  // 3) 리프 노드 삭제 케이스 확인
  bst.remove(2); // leaf
  console.log("after remove(2), find 2:", bst.find(2));

  // 4) 자식이 2개인 노드 삭제 케이스 확인
  bst.remove(7); // has two children
  console.log("after remove(7), find 7:", bst.find(7));
  console.log("root:", bst.root?.value);

  // 5) 반복문 기반 BST 동작 확인
  const bstIter = new IterativeBinarySearchTree();
  [10, 5, 15, 3, 7, 12, 18].forEach((v) => bstIter.insert(v));
  console.log("iter find 12:", bstIter.find(12)?.value);
  bstIter.remove(5);
  console.log("iter after remove(5), find 5:", bstIter.find(5));
}
