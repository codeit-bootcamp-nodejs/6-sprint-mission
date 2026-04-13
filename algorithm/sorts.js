/**
 * 선택 정렬 — 배열을 제자리에서 오름차순으로 정렬합니다.
 * @param {number[]} arr
 */
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
}

/**
 * 삽입 정렬 — 배열을 제자리에서 오름차순으로 정렬합니다.
 * @param {number[]} arr
 */
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

/**
 * 병합 정렬 — 원본은 바꾸지 않고 정렬된 새 배열을 반환합니다.
 * @param {number[]} arr
 * @returns {number[]}
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr.slice();

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merged = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);

  return merged;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

/**
 * 퀵 정렬 (Lomuto 파티션) — 배열을 제자리에서 오름차순으로 정렬합니다.
 * @param {number[]} arr
 * @param {number} [low]
 * @param {number} [high]
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
  }
}

/** 힙 정렬용: 인덱스 [시작, 끝] 구간에서 루트를 최대 힙 속성에 맞게 아래로 내립니다. */
function siftDown(arr, start, end) {
  let root = start;
  while (true) {
    const left = root * 2 + 1;
    if (left > end) break;
    let largest = root;
    if (arr[largest] < arr[left]) largest = left;
    const right = left + 1;
    if (right <= end && arr[largest] < arr[right]) largest = right;
    if (largest === root) break;
    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    root = largest;
  }
}

/**
 * 힙 정렬 — 배열을 제자리에서 오름차순으로 정렬합니다.
 * @param {number[]} arr
 */
function heapsort(arr) {
  const n = arr.length;
  if (n <= 1) return;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, n - 1);
  }
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    siftDown(arr, 0, end - 1);
  }
}

module.exports = {
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapsort,
};
