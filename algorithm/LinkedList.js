// ======================================
// ----------- 스프린트 미션 13 -----------
// ======================================

// 링크드 리스트 (Linked List)

// 메서드:
//   - addNode(value): 리스트의 끝에 새 노드를 추가
//   - findNode(value): 주어진 값을 가지는 노드를 찾아 리턴
//   - insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
//   - removeAfter(targetValue): 특정 값을 가진 노드 뒤의 노드를 삭제

// 핵심 키워드 :
// - Node(노드): 데이터(`value`)와 다음 노드에 대한 참조(`next`)를 담고 있는 리스트의 기본 단위
// - Head(헤드): 리스트의 첫 번째 노드. 리스트의 입구 역할
// - Pointer(포인터): 다음 데이터의 메모리 주소(JS에서는 객체 참조)를 가리킴
// - Traversal(순회): 특정 노드를 찾기 위해 Head부터 순차적으로 노드를 훑어가는 과정

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // addNode(value): 리스트의 끝에 새 노드를 추가
  addNode(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // findNode(value): 주어진 값을 가지는 노드를 찾아 리턴
  findNode(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  // insertAfter(targetValue, newValue): 특정 값을 가진 노드 뒤에 새 노드 추가
  insertAfter(targetValue, newValue) {
    const targetNode = this.findNode(targetValue);
    if (!targetNode) {
      console.warn(`Target value "${targetValue}" not found.`);
      return;
    }

    const newNode = new Node(newValue);
    newNode.next = targetNode.next;
    targetNode.next = newNode;
  }

  // removeAfter(targetValue): 특정 값을 가진 노드 뒤의 노드를 삭제
  removeAfter(targetValue) {
    const targetNode = this.findNode(targetValue);

    // 타겟 노드가 없거나, 타겟 뒤에 노드가 없는 경우 예외 처리
    if (!targetNode || !targetNode.next) {
      return;
    }

    // 포인터를 건너뛰어 연결을 끊음으로써 가비지 컬렉션의 대상이 되게 함
    const nodeToRemove = targetNode.next;
    targetNode.next = nodeToRemove.next;
    nodeToRemove.next = null; // 연결 해제 권장 (메모리 누수 방지 관점)
  }

  // 리스트의 상태를 출력해주는 보조 메서드
  printAll() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(" -> ") || "Empty List");
  }
}

// ======================================
// 테스트 코드 (검증)
// ======================================

const list = new LinkedList();
console.log("--- Initial State ---");
list.printAll();

console.log("\n--- addNode Test : 1, 3, 2, 4 순서로 입력 ---");
list.addNode(1);
list.addNode(3);
list.addNode(2);
list.addNode(4);
list.printAll();

console.log("\n--- findNode Test : [value: 2] 찾기 ---");
const node = list.findNode(2);
console.log(node ? `Found: ${node.value}` : "Not Found");

console.log("\n--- insertAfter Test : [value: 1] 뒤에 [value: 1.5] 추가 ---");
list.insertAfter(1, 1.5);
list.printAll();

console.log("\n--- removeAfter Test : [value: 2] 뒤의 노드([value: 4]) 삭제 ---");
list.removeAfter(2);
list.printAll();
