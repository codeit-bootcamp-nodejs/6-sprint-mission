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
