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

  // 트리에 값 추가
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return; // 중복값 무시
      }
    }
  }

  // 주어진 값을 찾고 해당 노드를 리턴
  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  // 트리에서 해당 값을 삭제
  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  _removeNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    } else {
      // 1. 자식이 없는 리프 노드인 경우
      if (!node.left && !node.right) return null;

      // 2. 자식이 하나인 경우
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // 3. 자식이 둘인 경우: 우측 서브트리에서 가장 작은 값을 가져옴
      let tempNode = this._getMin(node.right);
      node.value = tempNode.value;
      node.right = this._removeNode(node.right, tempNode.value);
      return node;
    }
  }

  _getMin(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }
}

module.exports = BinarySearchTree;

if (require.main === module) {
  const bst = new BinarySearchTree();
  console.log("find (empty):", bst.find(10));

  [5, 3, 7, 2, 4, 6, 8].forEach((v) => bst.insert(v));
  console.log("find 6:", bst.find(6)?.value);
  console.log("find 9:", bst.find(9));

  bst.remove(2); // leaf
  console.log("after remove(2), find 2:", bst.find(2));

  bst.remove(7); // has two children
  console.log("after remove(7), find 7:", bst.find(7));
  console.log("root:", bst.root?.value);
}
