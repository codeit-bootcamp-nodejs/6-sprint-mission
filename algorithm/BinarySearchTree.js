/*
insert(value): 트리에 값 추가
find(value): 주어진 값을 찾고 해당 노드를 리턴
remove(value): 트리에서 해당 값을 삭제
*/

// Node 클래스
class Node {
  constructor(data) {
    this.data = data;
    this.left = null; // 왼쪽 자식 노드
    this.right = null; // 오른쪽 자식 노드
  }
}

// BinarySearchTree 클래스
class BinarySearchTree {
  constructor() {
    this.root = null; // 트리의 루트 노드
  }

  // 트리를 문자열로 표현해서 리턴하는 메소드
  toString() {
    const traverse = (node) => {
      if (!node) return "";
      return `${traverse(node.left)} ${node.data} ${traverse(node.right)}`;
    };
    return traverse(this.root).trim();
  }

  // 트리에 값 추가
  insert(data) {
    const newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (data < current.data) {
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

  // 주어진 값을 찾고 해당 노드를 리턴
  find(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return current; // 노드를 찾았을 때 리턴
      } else if (data < current.data) {
        current = current.left; // 왼쪽 서브트리로 이동
      } else {
        current = current.right; // 오른쪽 서브트리로 이동
      }
    }
    return null; // 노드를 찾지 못했을 때 null 리턴
  }

  // 트리에서 해당 값을 삭제
  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null; // 노드를 찾지 못했을 때 null 리턴

      if (data === node.data) {
        // 삭제할 노드를 찾았을 때
        if (!node.left && !node.right) {
          return null; // 자식 노드가 없는 경우
        }
        if (!node.left) {
          return node.right; // 왼쪽 자식이 없는 경우
        }
        if (!node.right) {
          return node.left; // 오른쪽 자식이 없는 경우
        }
        // 자식 노드가 둘 다 있는 경우
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left; // 오른쪽 서브트리에서 가장 작은 노드 찾기
        }
        node.data = minRight.data; // 삭제할 노드의 값을 가장 작은 노드의 값으로 대체
        node.right = removeNode(node.right, minRight.data); // 오른쪽 서브트리에서 가장 작은 노드 삭제
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data); // 왼쪽 서브트리로 이동
        return node;
      } else {
        node.right = removeNode(node.right, data); // 오른쪽 서브트리로 이동
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }
}

// 사용 예시
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
console.log(bst.toString()); // "5 10 15"

const foundNode = bst.find(5);
console.log(foundNode ? foundNode.data : "Not found"); // "5"

bst.remove(10);
console.log(bst.toString()); // "5 15"
