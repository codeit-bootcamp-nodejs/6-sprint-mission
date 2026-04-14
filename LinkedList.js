class Node {
  constructor(data) {
    this.data = data; // 노드에 저장되는 데이터
    this.next = null; // 다음 노드 레퍼런스
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 첫 노드
    this.tail = null; // 끝 노드
    this.length = 0; // 연결된 노드 길이
  }

  // 빈 리스트인지 여부를 불린형으로 반환
  isEmpty() {
    return this.head === null;
  }

  // 리스트 끝에 새 노드 추가
  // 추가한 노드 반환
  addNode(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++; // 리스트 길이 증가
    return newNode;
  }

  // 주어진 값을 가지는 노드를 찾아 리턴
  findNode(value) {
    let iterator = this.head;

    while (iterator.data !== value) {
      iterator = iterator.next;
    }
    return iterator; // value가 없어서 끝까지 오면 null이 반환됨
  }

  // 특정 값을 가진 노드 뒤에 새 노드 추가
  // 추가된 노드 반환
  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);

    // 타겟 노드가 존재하지 않으면 null 반환
    if (!targetNode) return null;

    const newNode = new Node(newValue);
    if (targetNode === this.tail) {
      targetNode.next = newNode;
      this.tail = newNode;
    } else {
      newNode.next = targetNode.next;
      targetNode.next = newNode;
    }
    this.length++; // list 길이 증가
    return newNode;
  }

  // 특정 값을 가진 노드 뒤의 노드 삭제
  // 삭제된 노드 반환
  removeAfter(targetValue) {
    const targetNode = this.findNode(targetValue);

    // 타겟노드가 존재하지 않으면 null 반환
    if (!targetNode) return null;

    if (targetNode === this.tail) return null;
    const nodeToRemove = targetNode.next;
    targetNode.next = nodeToRemove.next;

    this.length--; // 리스트 길이 감소
    return nodeToRemove;
  }

  // 리스트 현재 길이 반환
  getSize() {
    return this.length;
  }

  // 리스트 값을 순서대로 출력해주는 보조 메소드
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

//---------------------------------- 테스트 코드
console.log('---------------------------------- LinkedList.js 테스트');
console.log('');
const 울집강쥐 = new LinkedList();

//------------ isEmpty 테스트
console.log('isEmpty');
console.log(울집강쥐.isEmpty());
console.log('');

//------------ addNode, getSize 테스트
console.log(`addNode('카르마'); addNode('베일리'), addNode('베니')`);
울집강쥐.addNode('카르마');
울집강쥐.addNode('베일리');
울집강쥐.addNode('베니');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//------------ findNode 테스트
console.log(`findNode('베일리')`);
console.log(울집강쥐.findNode('베일리'));
console.log('');

//------------- insertAfter 테스트
console.log(`insertAfter('베일리', '영희'); insertAfter('베일리', '여울이');`);
울집강쥐.insertAfter('베일리', '영희');
울집강쥐.insertAfter('베일리', '여울이');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//------------- removeAfter 테스트
console.log(`removeAfter('베일리')`);
울집강쥐.removeAfter('베일리');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');
