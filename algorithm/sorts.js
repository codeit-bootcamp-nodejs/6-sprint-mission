// 테스트용 배열
const testArray = [5, 3, 8, 4, 2];

// 선택정렬 (Selection Sort)

function selectionSort(arr) {
  console.log('\n=== Selection Sort 시작 ===');
  const a = [...arr];

  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i;
    console.log(`\n[i=${i}] 현재 배열:`, a);

    for (let j = i + 1; j < a.length; j++) {
      console.log(`  j=${j} 비교: ${a[j]} < ${a[minIndex]}`);
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      console.log(`  swap: ${a[i]} ↔ ${a[minIndex]}`);
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
    }
  }

  console.log('결과:', a);
  return a;
}

// 삽입정렬 (Insertion Sort)
function insertionSort(arr) {
  console.log('\n=== Insertion Sort 시작 ===');
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let current = a[i];
    let j = i - 1;

    console.log(`\n[i=${i}] current=${current}, 배열:`, a);

    while (j >= 0 && a[j] > current) {
      console.log(`  ${a[j]} > ${current} → 이동`);
      a[j + 1] = a[j];
      j--;
    }

    a[j + 1] = current;
    console.log('  삽입 후:', a);
  }

  console.log('결과:', a);
  return a;
}

// 병합정렬 (Merge Sort)
function mergeSort(arr) {
  console.log('mergeSort 호출:', arr);

  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  const merged = merge(sortedLeft, sortedRight);
  console.log('merge 결과:', merged);

  return merged;
}

function merge(left, right) {
  console.log(`  merge(${left}, ${right})`);

  const result = [];
  let i = 0;
  let j = 0; // 🔥 수정된 부분

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  result.push(...left.slice(i));
  result.push(...right.slice(j));

  return result;
}

// 퀵정렬 (Quick Sort)
function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start === 0 && end === arr.length - 1) {
    console.log('\n=== Quick Sort 시작 ===');
  }

  if (start < end) {
    const pivotIndex = partition(arr, start, end);
    console.log(`pivot 위치: ${pivotIndex}, 배열:`, arr);

    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
  }

  return arr;
}

function partition(arr, start, end) {
  const pivot = arr[end];
  console.log(`\npartition: pivot=${pivot}, 범위=[${start},${end}]`);

  let i = start - 1;

  for (let j = start; j < end; j++) {
    console.log(`  비교: ${arr[j]} <= ${pivot}`);
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      console.log('  swap:', arr);
    }
  }

  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  console.log('  pivot swap:', arr);

  return i + 1;
}

console.log('\n원본 배열:', testArray);

selectionSort(testArray);
insertionSort(testArray);
console.log('\n=== Merge Sort 시작 ===');
console.log('결과:', mergeSort([...testArray]));

quickSort([...testArray]);

function swap(tree, index1, index2) {
  const temp = tree[index1];
  tree[index1] = tree[index2];
  tree[index2] = temp;
}

function heapify(tree, index, treeSize) {
  const leftChild = 2 * index + 1;
  const rightChild = 2 * index + 2;
  let largest = index;

  if (leftChild < treeSize && tree[largest] < tree[leftChild]) {
    largest = leftChild;
  }

  if (rightChild < treeSize && tree[largest] < tree[rightChild]) {
    largest = rightChild;
  }

  if (largest !== index) {
    swap(tree, index, largest);
    heapify(tree, largest, treeSize);
  }
}

function heapsort(tree) {
  const treeSize = tree.length;

  for (let i = Math.floor(treeSize / 2) - 1; i >= 0; i--) {
    heapify(tree, i, treeSize);
  }

  for (let i = treeSize - 1; i > 0; i--) {
    swap(tree, 0, i);
    heapify(tree, 0, i);
  }
}

//힙 정렬 예시

// 1. 기본 정렬
const arr1 = [6, 1, 8, 3, 5, 2, 7, 4];
console.log('before:', [...arr1]); // before: [6, 1, 8, 3, 5, 2, 7, 4]
heapsort(arr1);
console.log('after:', arr1); // after:  [1, 2, 3, 4, 5, 6, 7, 8]

// 2. 이미 정렬된 배열
const arr2 = [1, 2, 3, 4, 5];
heapsort(arr2);
console.log('sorted:', arr2); // sorted: [1, 2, 3, 4, 5]

// 3. 역순 배열
const arr3 = [5, 4, 3, 2, 1];
heapsort(arr3);
console.log('reverse:', arr3); // reverse: [1, 2, 3, 4, 5]

// 4. 중복 값이 있는 배열
const arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
heapsort(arr4);
console.log('dupes:', arr4); // dupes: [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]

// 5. 요소가 하나인 배열
const arr5 = [42];
heapsort(arr5);
console.log('single:', arr5); // single: [42]

// 6. 동작 과정 시각화 (arr = [6, 1, 8, 3])
//
//    원본 배열:        heap 구성 후:      정렬 과정:
//
//        6                 8              swap(8,3) → heapify
//       / \               / \                 3
//      1   8             6   6               / \
//     /               /                    6   6
//    3               3                    /
//                                        8  ← 정렬 완료 영역
//
//    최종 결과: [1, 3, 6, 8]
//
const arr6 = [6, 1, 8, 3];
heapsort(arr6);
console.log('visual:', arr6); // visual: [1, 3, 6, 8]
