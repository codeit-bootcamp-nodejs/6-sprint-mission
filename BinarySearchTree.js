class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }
}

function printInOrder(node) {
  if (node !== null) {
    printInOrder(node.leftChild);
    console.log(node.data);
    printInOrder(node.rightChild);
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  // 트리가 비어 있는지 여부를 boolean으로 반환
  isEmpty() {
    return this.root === null;
  }

  // 트리에 값 추가
  insert(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.root = newNode;
      this.count++;
      return;
    } else {
      let curr = this.root;

      while (curr !== null) {
        if (curr.data < value) {
          if (curr.rightChild === null) {
            curr.rightChild = newNode;
            curr.rightChild.parent = curr;
            this.count++;
            return;
          } else curr = curr.rightChild;
        } else {
          if (curr.leftChild === null) {
            curr.leftChild = newNode;
            curr.leftChild.parent = curr;
            this.count++;
            return;
          } else curr = curr.leftChild;
        }
      }
    }
  }

  // 주어진 값을 찾고 해당 노드를 리턴
  find(value) {
    let curr = this.root;

    while (curr !== null) {
      if (curr.data === value) return curr;
      else if (curr.data < value) curr = curr.rightChild;
      else curr = curr.leftChild;
    }
    return null;
  }

  // 트리에서 해당 값을 삭제
  // 삭제된 자리에 들어가는 대체 노드 반환
  remove(value) {
    let node = this.find(value);

    // 삭제하고자 하는 값을 가진 노드가 존재하지 않는 경우, null 반환
    if (node === null) return null;

    // 삭제하려는 값을 가진 노드가 유일한 노드인 경우, 삭제/빈 트리로 만들기/null 반환
    if (this.count === 1) {
      this.root = null;
      this.count = 0;

      console.log('The only node removed');
      return null;
    }

    // 삭제할 node가 leaf node인 경우, 삭제하고 null 반환
    if (node.leftChild === null && node.rightChild === null) {
      if (node.parent.leftChild === node) node.parent.leftChild = null;
      else node.parent.rightChild = null;
      node.parent = null;

      console.log('A leaf node removed');
      this.count--;
      return null;
    }

    // leftChild만 있는 경우, 왼쪽 subtree에서 최대값 갖는 노드로 대체하고 대체 노드 반환
    if (node.rightChild === null) {
      const maxNode = this.findMax(node.leftChild);
      node.data = maxNode.data;

      if (maxNode === maxNode.parent.leftChild) {
        maxNode.parent.leftChild = maxNode.leftChild;
      } else {
        maxNode.parent.rightChild = maxNode.leftChild;
      }
      if (maxNode.leftChild !== null) maxNode.leftChild.parent = maxNode.parent;
    } else {
      // 나머지 경우, 오른쪽 subtree에서 최소값 갖는 노드로 대체하고 대체 노드 반환
      // (rightChild만 있거나 두 자식이 모두 있는 경우)
      const minNode = this.findMin(node.rightChild);
      node.data = minNode.data;

      if (minNode === minNode.parent.rightChild) {
        minNode.parent.rightChild = minNode.rightChild;
      } else {
        minNode.parent.leftChild = minNode.rightChild;
      }
      if (minNode.rightChild !== null) minNode.rightChild.parent = minNode.parent;
    }
    this.count--;
    return node;
  }

  // 부분 트리에서 최소값 가진 노드 찾고 반환
  findMin(node) {
    let curr = node;
    while (curr.leftChild !== null) {
      curr = curr.leftChild;
    }
    return curr;
  }

  // 부분 트리에서 최대값 가진 노드 찾고 반환
  findMax(node) {
    let curr = node;
    while (curr.rightChild !== null) {
      curr = curr.rightChild;
    }
    return curr;
  }

  // node 갯수 반환
  getSize() {
    return this.count;
  }

  // In-order traverse로 출력
  printSortedTree() {
    printInOrder(this.root);
  }

  // Level-order traverse로 출력
  printLevelOrder() {
    if (!this.root) return [];

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      result.push(current.data);

      if (current.leftChild) queue.push(current.leftChild);
      if (current.rightChild) queue.push(current.rightChild);
    }
    console.log(result);
  }
}

//------------------------------------------------- 테스트 코드
import { uniqueRandom } from './uniqueRandom.js';

const myBST = new BinarySearchTree();
const myArr = [...uniqueRandom(5, 11).map((n) => n + 5)];
for (const n of myArr) myBST.insert(n);

console.log(`-------------------- BST 테스트: insert(value)`);
console.log('Array to insert:');
console.log(myArr);
console.log('');

console.log('Level-order traverse:');
myBST.printLevelOrder();
console.log('');

console.log(`node count: ${myBST.getSize()}`);
console.log('');

const myValue = 5;
console.log(`-------------------- BST 테스트: find(${myValue})`);
let result = myBST.find(myValue);
if (result.parent !== null) console.log(`parent: ${result.parent.data}`);
if (result.leftChild !== null) console.log(`leftChild: ${result.leftChild.data}`);
if (result.rightChild !== null) console.log(`rightChild: ${result.rightChild.data}`);
console.log('');

console.log(`-------------------- BST 테스트: remove(${myValue})`);
result = myBST.remove(myValue);
if (result === null) console.log('대체 노드가 없는 경우입니다.');
else {
  console.log(`replaced by ${result.data}`);
  if (result.parent !== null) console.log(`parent: ${result.parent.data}`);
  if (result.leftChild !== null) console.log(`leftChild: ${result.leftChild.data}`);
  if (result.rightChild !== null) console.log(`rightChild: ${result.rightChild.data}`);
}
console.log('');

console.log('In-order traverse:');
myBST.printSortedTree();
console.log('');

console.log(`node count: ${myBST.getSize()}`);
console.log('');
