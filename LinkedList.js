/**
 * 클래스 이름: LinkedList
 * addNode(value): 리스트의 끝에 새 노드를 추가
 * findNode(value): 주어진 값을 가지는 노드를 찾아 리턴
 * insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
 * removeAfter(targetValue): 특정 값을 가진 노드 뒤의 노드를 삭제
 */

// 기본 노드 클래스 생성
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // 리스트의 끝에 새 노드를 추가
  addNode(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  //주어진 값을 가지는 노드를 찾아 리턴
  findNode(value) {
    let iterator = this.head;
    while (iterator !== null) {
      if (iterator.data === value) {
        return iterator;
      }
      iterator = iterator.next;
    }
    return null;
  }

  // 특정 값을 가진 노드 뒤에 새 노드 추가
  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);
    const newNode = new Node(newValue);

    newNode.next = targetNode.next;
    targetNode.next = newNode;
  }

  // 특정 값을 가진 노드 뒤의 노드를 삭제
  removeAfter(targetValue) {
    const targetNode = this.findNode(targetValue);

    targetNode.next = targetNode.next.next;
  }

  // 테스트용 함수
  printAll() {
    let iterator = this.head;
    let result = [];
    while (iterator !== null) {
      result.push(iterator.data);
      iterator = iterator.next;
    }
    console.log(result.join(' -> '));
  }
}

const testList = new LinkedList();
[1, 2, 3, 4, 5].forEach((val) => testList.addNode(val));

console.log('======== 테스트 시작 ========');

console.log('# 1. addNode 테스트');
testList.addNode(6);
testList.printAll(); //[1, 2, 3, 4, 5, 6]

console.log('# 2. findNode 테스트');
const found = testList.findNode(3);
console.log(found.data); //[3]

console.log('# 3. insertAfter 테스트');
testList.insertAfter(4, 4.5);
testList.printAll(); //[1, 2, 3, 4, 4.5, 5, 6]

console.log('# 4. removeAfter 테스트');
testList.removeAfter(4);
testList.printAll(); // [1, 2, 3, 4, 5, 6]

console.log('======== 테스트 종료 ========');
