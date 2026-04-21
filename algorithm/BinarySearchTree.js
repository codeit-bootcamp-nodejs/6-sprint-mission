// ======================================
// ----------- 스프린트 미션 13 -----------
// ======================================

// 이진 탐색 트리 (Binary Search Tree)

// 메서드:
//   - insert(value): 트리에 값 추가
//   - find(value): 주어진 값을 찾고 해당 노드를 리턴
//   - remove(value): 트리에서 해당 값을 삭제

// 핵심 키워드 :
// - Root(루트): 트리의 최상단 노드. 모든 탐색의 시작점
// - Left / Right Child: 부모보다 작은 값은 왼쪽, 큰 값은 오른쪽에 배치하여 탐색 효율을 극대화
// - Recursion(재귀): 트리의 하위 구조가 전체 구조와 동일한 특성(Sub-tree)을 가지므로 재귀적 접근이 매우 직관적이고 강력함
// - Successor(후계자): 노드 삭제 시 트리 구조를 유지하기 위해 해당 자리를 대체할 노드

class BSTNode {
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

  // insert(value): 트리에 값 추가
  insert(value) {
    const newNode = new BSTNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  // find(value): 주어진 값을 찾고 해당 노드를 리턴
  find(value) {
    return this._findNode(this.root, value);
  }

  _findNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      return this._findNode(node.left, value);
    } else if (value > node.value) {
      return this._findNode(node.right, value);
    } else {
      return node;
    }
  }

  // remove(value): 트리에서 해당 값을 삭제
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
      // 1. 자식이 없는 경우 (Leaf)
      if (!node.left && !node.right) {
        return null;
      }

      // 2. 자식이 하나만 있는 경우
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // 3. 자식이 둘 다 있는 경우
      // 오른쪽 서브트리에서 가장 작은 값을 찾아 현재 노드를 대체 (Successor)
      const minNode = this._findMinNode(node.right);
      node.value = minNode.value;
      node.right = this._removeNode(node.right, minNode.value);
      return node;
    }
  }

  _findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // 트리 구조를 시각적으로 확인하기 위한 중위 순회(In-order Traversal) 출력
  printInOrder() {
    const result = [];
    this._inOrder(this.root, result);
    console.log("In-order (Sorted):", result.join(" -> ") || "Empty Tree");
  }

  _inOrder(node, result) {
    if (node) {
      this._inOrder(node.left, result);
      result.push(node.value);
      this._inOrder(node.right, result);
    }
  }
}

// ======================================
// 테스트 코드 (검증)
// ======================================

const bst = new BinarySearchTree();
console.log("--- Insert Test: [18, 10, 6, 12, 25] 값 삽입 후 정렬 ---");
[18, 10, 6, 12, 25].forEach((v) => bst.insert(v));
console.log("값 삽입 후 출력 : ", bst.root);

console.log("\n--- Find Test: [value: 12] 찾기 ---");
const found = bst.find(12);
console.log(`찾은 값 : ${found.value}`);

console.log("\n--- Remove Test (Leaf): [value: 8] 삭제 ---");
bst.remove(18);
console.log("삭제 후 출력 : ", bst.root);

console.log("\n--- Remove Test (One Child): [value: 20] ---");
bst.remove(25);
console.log("삭제 후 출력 : ", bst.root);
