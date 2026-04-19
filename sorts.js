// 다음 정렬 알고리즘을 각각 JavaScript 함수로 구현해 주세요.

// 선택 정렬 (Selection sort)
// 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // 자리 교환
    }
  }
}

// 삽입 정렬 (Insertion sort)
// 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > currentVal) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentVal;
  }
}

// 병합 정렬 (Merge sort)
// 숫자형 배열을 파라미터로 받고, 정렬된 새로운 배열을 리턴하도록 구현합니다.

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// 퀵 정렬 (Quick sort)
// 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
}

function partition(arr, start, end) {
  let pivot = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  return swapIdx;
}

console.log('1. 선택 정렬 테스트');
const nums1 = [3, 1, 2];
selectionSort(nums1);
console.log(nums1);

console.log('\n2. 삽입 정렬 테스트');
const nums2 = [3, 1, 2];
insertionSort(nums2);
console.log(nums2);

console.log('\n3. 병합 정렬 테스트 (새 배열 리턴)');
const nums3 = [3, 1, 2];
const sortedNums3 = mergeSort(nums3);
console.log(sortedNums3);

console.log('\n4. 퀵 정렬 테스트');
const nums4 = [3, 1, 2];
quickSort(nums4);
console.log(nums4);

/** 
 * 힙 정렬
함수 이름: heapsort()
숫자형 배열을 받아서 받은 배열을 정렬된 상태로 수정
 */

function heapsort(arr) {
  const n = arr.length;

  // 1. 최대 힙(Max Heap) 구성
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 2. 힙에서 요소를 하나씩 추출하여 정렬
  for (let i = n - 1; i > 0; i--) {
    // 현재 루트(최댓값)를 배열의 끝으로 보냄
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // 배열의 크기를 줄여서 다시 최대 힙 구성
    heapify(arr, i, 0);
  }
}

// 힙의 성질을 유지하도록 돕는 함수
function heapify(arr, n, i) {
  let largest = i; // 루트를 가장 큰 값으로 가정
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // 왼쪽 자식이 더 크면 largest 업데이트
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // 오른쪽 자식이 더 크면 largest 업데이트
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // largest가 루트가 아니면 위치를 교환하고 서브트리에 대해 재귀 호출
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// 테스트
console.log('\n5. 힙 정렬 테스트');
const nums5 = [3, 1, 2, 5, 4];
heapsort(nums5);
console.log(nums5);
