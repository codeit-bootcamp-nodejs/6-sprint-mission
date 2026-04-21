// ======================================
// ----------- 스프린트 미션 12 -----------
// ======================================

// 선택 정렬 (Selection sort)
// 문제 1) 선택 정렬 : 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

function selectionSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}

const nums1 = [3, 1, 2];
console.log(`선택 정렬 전 배열 : ${nums1}`);
selectionSort(nums1);
console.log(`선택 정렬 후 배열 : ${nums1}`);

// =========================================

// 삽입 정렬 (Insertion sort)
// 문제 2) : 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

function insertionSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    let targetVal = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > targetVal) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = targetVal;
  }
}

const nums2 = [3, 1, 2];
console.log(`삽입 정렬 전 배열 : ${nums2}`);
insertionSort(nums2);
console.log(`삽입 정렬 후 배열 : ${nums2}`);

// =========================================

// 병합 정렬 (Merge sort)
// 문제 3) 병합 정렬 : 숫자형 배열을 파라미터로 받고, 정렬된 새로운 배열을 리턴하도록 구현합니다.

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
}

// 병합(Merge)을 담당하는 헬퍼 함수
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const nums3 = [3, 1, 2];
console.log(`병합 정렬 전 배열 : ${nums3}`);
const result3 = mergeSort(nums3);
console.log(`병합 정렬 후 배열 : ${result3}`);

// =========================================

// 퀵 정렬 (Quick sort)
// 문제 4) 퀵 정렬 : 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) {
    return;
  }

  const pivotIndex = partition(arr, left, right);

  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
}

// 분할(Partition)을 담당하는 헬퍼 함수
function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

const nums4 = [3, 1, 2];
console.log(`퀵 정렬 전 배열 : ${nums4}`);
quickSort(nums4);
console.log(`퀵 정렬 후 배열 : ${nums4}`);

// ======================================
// ----------- 스프린트 미션 13 -----------
// ======================================

// 힙 정렬 (Heap sort)
// 숫자형 배열을 받아서 받은 배열을 정렬된 상태로 수정

function heapSort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];

    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    heapify(arr, n, largest);
  }
}

const numsHeap = [4, 10, 3, 5, 1];
console.log(`힙 정렬 전 배열 : ${numsHeap}`);
heapSort(numsHeap);
console.log(`힙 정렬 후 배열 : ${numsHeap}`);
