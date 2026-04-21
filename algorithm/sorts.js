/*
선택 정렬 (Selection sort)

숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

삽입 정렬 (Insertion sort)

숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

병합 정렬 (Merge sort)

숫자형 배열을 파라미터로 받고, 정렬된 새로운 배열을 리턴하도록 구현합니다.

퀵 정렬 (Quick sort)

숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.
*/

// 선택 정렬
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

// 삽입 정렬
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// 병합 정렬
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
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

// 퀵 정렬
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);
  return quickSort(left).concat(middle, quickSort(right));
}

// 힙 정렬
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

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

function heapsort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

// 정렬 알고리즘 테스트
const arr = [11, 2, 9, 1, 5, 6, 9];
console.log("선택 정렬 전", arr);
console.log("선택 정렬", selectionSort([...arr]));
console.log("삽입 정렬 전", arr);
console.log("삽입 정렬", insertionSort([...arr]));
console.log("병합 정렬 전", arr);
console.log("병합 정렬", mergeSort([...arr]));
console.log("퀵 정렬 전", arr);
console.log("퀵 정렬", quickSort([...arr]));
console.log("힙 정렬 전", arr);
console.log("힙 정렬", heapsort([...arr]));
