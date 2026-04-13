class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
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
    while (current) {
      if (value < current.data) {
        if (current.leftChild === null) {
          current.leftChild = newNode;
          return;
        }
        current = current.leftChild;
      } else if (value > current.data) {
        if (current.rightChild === null) {
          current.rightChild = newNode;
          return;
        }
        current = current.rightChild;
      } else {
        return;
      }
    }
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.data) return current;
      if (value < current.data) {
        current = current.leftChild;
      } else {
        current = current.rightChild;
      }
    }
    return null;
  }

  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  _removeNode(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.leftChild = this._removeNode(node.leftChild, value);
      return node;
    }

    if (value > node.data) {
      node.rightChild = this._removeNode(node.rightChild, value);
      return node;
    }

    if (node.leftChild === null && node.rightChild === null) {
      return null;
    }

    if (node.leftChild === null) return node.rightChild;
    if (node.rightChild === null) return node.leftChild;

    let successor = node.rightChild;
    while (successor.leftChild !== null) {
      successor = successor.leftChild;
    }
    node.data = successor.data;
    node.rightChild = this._removeNode(node.rightChild, successor.data);
    return node;
  }

  preorder(node = this.root, result = []) {
    if (node === null) return result;
    result.push(node.data);
    this.preorder(node.leftChild, result);
    this.preorder(node.rightChild, result);
    return result;
  }

  inorder(node = this.root, result = []) {
    if (node === null) return result;
    this.inorder(node.leftChild, result);
    result.push(node.data);
    this.inorder(node.rightChild, result);
    return result;
  }

  postorder(node = this.root, result = []) {
    if (node === null) return result;
    this.postorder(node.leftChild, result);
    this.postorder(node.rightChild, result);
    result.push(node.data);
    return result;
  }
}

const bst = new BinarySearchTree();

// 1. insert - 트리에 값 추가
//
//        50
//       /  \
//     30    70
//    /  \   /  \
//  20   40 60   80
//
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

console.log('inorder:', bst.inorder()); // [20, 30, 40, 50, 60, 70, 80]
console.log('preorder:', bst.preorder()); // [50, 30, 20, 40, 70, 60, 80]
console.log('postorder:', bst.postorder()); // [20, 40, 30, 60, 80, 70, 50]

// 2. find - 값으로 노드 검색
const found = bst.find(40);
console.log('find 40:', found.data); // find 40: 40
console.log('find 40 left:', found.leftChild); // find 40 left: null
console.log('find 40 right:', found.rightChild); // find 40 right: null

const notFound = bst.find(99);
console.log('find 99:', notFound); // find 99: null

// 3. remove - 리프 노드 삭제 (자식 없음)
//
//        50
//       /  \
//     30    70
//      \   /  \
//      40 60   80
//
bst.remove(20);
console.log('remove 20:', bst.inorder()); // [30, 40, 50, 60, 70, 80]

// 4. remove - 자식이 하나인 노드 삭제
//
//        50
//       /  \
//     40    70
//          /  \
//         60   80
//
bst.remove(30);
console.log('remove 30:', bst.inorder()); // [40, 50, 60, 70, 80]

// 5. remove - 자식이 둘인 노드 삭제 (후속자로 대체)
//
//        60
//       /  \
//     40    70
//             \
//             80
//
bst.remove(50);
console.log('remove 50:', bst.inorder()); // [40, 60, 70, 80]
console.log('new root:', bst.root.data); // new root: 60
