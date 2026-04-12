function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j -= 1;
    }

    arr[j + 1] = key;
  }
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr.slice();
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(right[j]);
      j += 1;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i += 1;
  }

  while (j < right.length) {
    result.push(right[j]);
    j += 1;
  }

  return result;
}

function quickSort(arr) {
  quickSortRange(arr, 0, arr.length - 1);
}

function quickSortRange(arr, left, right) {
  if (left >= right) {
    return;
  }

  const pivotIndex = partition(arr, left, right);
  quickSortRange(arr, left, pivotIndex - 1);
  quickSortRange(arr, pivotIndex + 1, right);
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 1;
    }
  }

  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

const nums1 = [3, 1, 2];
selectionSort(nums1);
console.log('selectionSort:', nums1);

const nums2 = [5, 2, 4, 6, 1, 3];
insertionSort(nums2);
console.log('insertionSort:', nums2);

const nums3 = [38, 27, 43, 3, 9, 82, 10];
const sorted3 = mergeSort(nums3);
console.log('mergeSort result:', sorted3);
console.log('mergeSort original:', nums3);

const nums4 = [10, 7, 8, 9, 1, 5];
quickSort(nums4);
console.log('quickSort:', nums4);
