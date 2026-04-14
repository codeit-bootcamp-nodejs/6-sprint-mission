class Node {
  constructor(data) {
    this.data = data;
    this.below = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.height = 0;
  }

  // 스택이 비어 있는지 불린형으로 리턴
  isEmpty() {
    return this.top === null;
  }

  // 스택의 맨 위에 값을 추가
  push(value) {
    const newNode = new Node(value);
    newNode.below = this.top;
    this.top = newNode;
    this.height++;
  }

  // 스택의 맨 위 값을 제거하고 그 값을 리턴
  pop() {
    if (this.isEmpty()) return null;

    const dataToReturn = this.top.data;
    this.top = this.top.below;
    this.height--;
    return dataToReturn;
  }

  // 스택의 맨 위 값을 제거하지 않고 그 값을 리턴
  peek() {
    return this.top === null ? null : this.top.data;
  }

  // 추가 기능
  getSize() {
    return this.height;
  }

  // 내부 상태 확인을 위한 보조 메소드
  toString() {
    let resStr = 'top → |';
    let iterator = this.top;
    while (iterator !== null) {
      resStr += ` ${iterator.data} |`;
      iterator = iterator.below;
    }
    return resStr + ' ← bottom';
  }
}

//------------------------------------------------- 테스트 코드
console.log('---------------------------------------------- Stack.js');
const 울집강쥐 = new Stack();

//--------------- isEmpty 테스트
console.log('isEmpty();');
console.log(울집강쥐.isEmpty());
console.log('');

//--------------- push 테스트
console.log(`push('카르마'); push('베일리'); push('라피');`);
울집강쥐.push('카르마');
울집강쥐.push('베일리');
울집강쥐.push('라피');
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//--------------- pop 테스트
console.log('pop();');
울집강쥐.pop();
console.log(울집강쥐.toString());
console.log(`울집강쥐 수: ${울집강쥐.getSize()}마리`);
console.log('');

//--------------- peek 테스트
console.log('peek();');
console.log(울집강쥐.peek());
console.log('');

//--------------- isEmpty 테스트
console.log('isEmpty();');
console.log(울집강쥐.isEmpty());
console.log('');
