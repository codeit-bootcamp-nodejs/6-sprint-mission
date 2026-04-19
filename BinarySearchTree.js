/**
 * 클래스 이름: BinarySearchTree
 * insert(value): 트리에 값 추가
 * find(value): 주어진 값을 찾고 해당 노드를 리턴
 * remove(value): 트리에서 해당 값을 삭제
 */

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

  // 트리에 값 추가
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return; // 중복 값 무시
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // 주어진 값을 찾고 해당 노드 반환
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

  // 트리에서 해당 값 삭제
  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  // 삭제 처리를 위한 내부 재귀 함수
  _removeNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    } else {
      // 1. 자식이 없는 경우 (리프 노드)
      if (!node.left && !node.right) {
        return null;
      }
      // 2. 자식이 하나인 경우
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      // 3. 자식이 둘인 경우 (오른쪽 서브트리의 최솟값으로 대체)
      let temp = node.right;
      while (temp.left) {
        temp = temp.left;
      }
      node.value = temp.value;
      node.right = this._removeNode(node.right, temp.value);
      return node;
    }
  }
}
