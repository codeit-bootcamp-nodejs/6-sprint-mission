class Node {
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

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  _removeNode(node, value) {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
    } else {
      // 자식이 없는 경우
      if (node.left === null && node.right === null) return null;
      // 자식이 하나인 경우
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      // 자식이 둘인 경우 오른쪽 서브트리의 최솟값(inorder successor)으로 대체
      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      node.value = successor.value;
      node.right = this._removeNode(node.right, successor.value);
    }
    return node;
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log(bst.find(7).value); // 7
console.log(bst.find(99)); // null

bst.remove(5);
console.log(bst.find(5)); // null
console.log(bst.find(7).value); // 7 (여전히 존재)
