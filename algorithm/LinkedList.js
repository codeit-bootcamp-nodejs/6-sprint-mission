/** 단방향 연결 리스트의 노드 */
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * 리스트의 끝에 새 노드를 추가합니다.
   * @param {*} value
   */
  addNode(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  /**
   * 주어진 값을 가지는 노드를 찾아 반환합니다. 없으면 null.
   * @param {*} value
   * @returns {ListNode|null}
   */
  findNode(value) {
    let cur = this.head;
    while (cur) {
      if (cur.value === value) return cur;
      cur = cur.next;
    }
    return null;
  }

  /**
   * targetValue를 가진 노드 뒤에 newValue 노드를 삽입합니다.
   * 대상 노드가 없으면 false를 반환합니다.
   * @param {*} targetValue
   * @param {*} newValue
   * @returns {boolean}
   */
  insertAfter(targetValue, newValue) {
    const target = this.findNode(targetValue);
    if (!target) return false;
    const inserted = new ListNode(newValue);
    inserted.next = target.next;
    target.next = inserted;
    return true;
  }

  /**
   * targetValue를 가진 노드의 바로 다음 노드를 제거하고, 제거된 값을 반환합니다.
   * 대상이 없거나 뒤에 노드가 없으면 null을 반환합니다.
   * @param {*} targetValue
   * @returns {*|null}
   */
  removeAfter(targetValue) {
    const target = this.findNode(targetValue);
    if (!target || !target.next) return null;
    const removed = target.next;
    target.next = removed.next;
    return removed.value;
  }
}

module.exports = LinkedList;

if (require.main === module) {
  // 1) 기본 리스트 생성: 1 -> 2 -> 4
  const list = new LinkedList();
  [1, 2, 4].forEach((v) => list.addNode(v));

  // 2) 존재/미존재 값 탐색 확인
  console.log("find 2:", list.findNode(2)?.value);
  console.log("find 9:", list.findNode(9));

  // 3) 2 뒤에 3 삽입 후 정상 연결 확인
  console.log("insertAfter(2, 3):", list.insertAfter(2, 3));
  console.log("find 3:", list.findNode(3)?.value);

  // 4) 2 뒤 노드(3) 제거 후 제거 결과 확인
  console.log("removeAfter(2):", list.removeAfter(2));
  console.log("find 3 after remove:", list.findNode(3));
}
