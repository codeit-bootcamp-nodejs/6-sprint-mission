// 링크드 리스트의 노드 클래스
class Node {
  constructor(data) {
    this.data = data; // 노드에 저장되는 데이터
    this.next = null; // 다음 노드 레퍼런스
    this.prev = null;
  }
}

// 링크드 리스트 클래스
class DoublyLinkedList {
  constructor() {
    this.head = null; // 첫 노드
    this.tail = null; // 끝 노드
    this.length = 0; // 연결된 노드 길이
  }

  isEmpty() {
    return this.head === null;
  }

  // 리스트 앞쪽에 노드 추가
  addToHead(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  // 리스트 뒤쪽에 노드 추가
  addToTail(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // 특정 값을 가진 노드를 찾아 반환
  findNode(value) {
    let iterator = this.head;

    while (iterator.data !== value) {
      iterator = iterator.next;
    }
    return iterator;
  }

  // 특정 값을 가진 노드 뒤에 새 노드 추가
  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);
    if (!targetNode) return null;

    const newNode = new Node(newValue);

    if (targetNode === this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = targetNode;
      newNode.next = targetNode.next;
      targetNode.next.prev = newNode;
      targetNode.next = newNode;
    }
    this.length++;
  }

  // 특정 값을 가진 노드 삭제
  removeNode(value) {
    const nodeToRemove = this.findNode(value);
    if (!nodeToRemove) return null;

    if (nodeToRemove === this.head) {
      this.head = nodeToRemove.next;
      this.head.prev = null;
    } else if (nodeToRemove === this.tail) {
      this.tail = nodeToRemove.prev;
      this.tail.next = null;
    } else {
      nodeToRemove.prev.next = nodeToRemove.next;
      nodeToRemove.next.prev = nodeToRemove.prev;
    }
    this.length--;
    return nodeToRemove;
  }

  getSize() {
    return this.length;
  }

  toString() {
    let resStr = 'start → |';
    let iterator = this.head;
    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.next;
    }
    return resStr + ' → null';
  }
}

//------------------------------------- 테스트 코드
console.log('--------------------------------------- DoublyLinkedList.js');
const 울집강쥐 = new DoublyLinkedList();

//-------------- isEmpty
console.log('isEmpty()');
console.log(울집강쥐.isEmpty());
console.log('');

//-------------- addToHead, getSize 테스트
console.log(`addToHead('카르마'); addToHead('베일리');`);
울집강쥐.addToHead('카르마');
울집강쥐.addToHead('베일리');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//-------------- addToTail, getSize 테스트
console.log(`addToTail('영희'); addToTail('베니');`);
울집강쥐.addToTail('영희');
울집강쥐.addToTail('베니');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//-------------- insertAfter, getSize 테스트
console.log(`insertAfter('영희', '뽀미');`);
울집강쥐.insertAfter('영희', '뽀미');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//-------------- findNode 테스트
console.log(`findNode('뽀미');`);
console.log(울집강쥐.findNode('뽀미'));
console.log('');

//-------------- removeNode, getSize 테스트
console.log(`removeNode('뽀미');`);
울집강쥐.removeNode('뽀미');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');
