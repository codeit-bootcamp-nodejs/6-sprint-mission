function swap(tree, index1, index2) {
  const temp = tree[index1];
  tree[index1] = tree[index2];
  tree[index2] = temp;
}

function heapify(tree, index, treeSize) {
  const index_leftChild = index * 2 + 1;
  const index_rightChild = index * 2 + 2;
  let index_largest = index;

  if (index_leftChild < treeSize && tree[index_largest] < tree[index_leftChild])
    index_largest = index_leftChild;
  if (index_rightChild < treeSize && tree[index_largest] < tree[index_rightChild])
    index_largest = index_rightChild;

  if (index !== index_largest) {
    swap(tree, index, index_largest);
    heapify(tree, index_largest, treeSize);
  }
}

// heapsort for a zero-based complete binary tree
// 숫자형 배열을 받아서 받은 배열을 정렬된 상태로 수정
function heapSort(tree) {
  const treeSize = tree.length;
  const lastParent = Math.floor(treeSize / 2) - 1;

  for (let i = lastParent; i >= 0; i--) {
    heapify(tree, i, treeSize);
  }
  for (let i = treeSize - 1; i > 0; i--) {
    swap(tree, 0, i);
    heapify(tree, 0, i);
  }
}

// 1회 수행 시 최악 시간복잡도: O(log n)

//------------------------------------------------- 테스트 코드
console.log('------------------------------------------ sort.js (heapsort)');
import { uniqueRandom } from './uniqueRandom.js';

const tree = [...uniqueRandom(5, 11).map((n) => n + 5)]; // 완전 이진 트리 배열
console.log('0~10 무작위순 숫자 배열');
console.log(tree);
console.log('');
heapSort(tree);
console.log('0~10 heapsort로 정렬된 숫자 배열');
console.log(tree);
