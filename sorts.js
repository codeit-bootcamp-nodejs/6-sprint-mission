// 선택 정렬
function selectionSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < n; j += 1) {
      if (nums[j] < nums[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      const tmp = nums[i];
      nums[i] = nums[minIndex];
      nums[minIndex] = tmp;
    }
  }
  return nums;
}

// 삽입 정렬
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i += 1) {
    const key = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j -= 1;
    }
    nums[j + 1] = key;
  }
  return nums;
}

// 병합 정렬
function mergeSort(nums) {
  if (nums.length <= 1) return nums.slice();

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

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

// 퀵 정렬
function quickSort(nums) {
  function partition(lo, hi) {
    const pivot = nums[Math.floor((lo + hi) / 2)];
    let i = lo;
    let j = hi;
    while (i <= j) {
      while (nums[i] < pivot) i += 1;
      while (nums[j] > pivot) j -= 1;
      if (i <= j) {
        const tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
        i += 1;
        j -= 1;
      }
    }
    return i;
  }

  function sort(lo, hi) {
    if (lo >= hi) return;
    const index = partition(lo, hi);
    sort(lo, index - 1);
    sort(index, hi);
  }

  if (nums.length > 1) sort(0, nums.length - 1);
  return nums;
}

// 힙을 구성하는 헬퍼 함수
function heapify(arr, length, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // 왼쪽 자식이 부모보다 크면 최대값을 왼쪽 자식으로 설정
  if (left < length && arr[left] > arr[largest]) {
    largest = left;
  }

  // 오른쪽 자식이 가장 큰 값보다 크면 최대값을 오른쪽 자식으로 설정
  if (right < length && arr[right] > arr[largest]) {
    largest = right;
  }

  // 최대값이 루트가 아니라면 교환하고 재귀적으로 힙을 다시 구성
  if (largest !== i) {
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    heapify(arr, length, largest);
  }
}

// 힙 정렬 함수
function heapsort(arr) {
  const length = arr.length;

  // 1. 배열을 최대 힙(Max Heap) 구조로 만듭니다.
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    heapify(arr, length, i);
  }

  // 2. 힙에서 요소를 하나씩 추출하여 배열의 뒤쪽부터 정렬합니다.
  for (let i = length - 1; i > 0; i--) {
    // 현재 루트(가장 큰 값)를 배열의 끝으로 보냅니다.
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // 축소된 힙에 대해 다시 최대 힙을 구성합니다.
    heapify(arr, i, 0);
  }

  return arr;
}

module.exports = { selectionSort, insertionSort, mergeSort, quickSort, heapsort };

if (require.main === module) {
  const nums1 = [3, 1, 2];
  console.log("before selectionSort:", nums1);
  selectionSort(nums1);
  console.log("after  selectionSort:", nums1);

  const nums2 = [5, 2, 4, 6, 1, 3];
  console.log("\nbefore insertionSort:", nums2);
  insertionSort(nums2);
  console.log("after  insertionSort:", nums2);

  const nums3 = [3, 1, 2];
  console.log("\nbefore mergeSort:", nums3);
  const merged = mergeSort(nums3);
  console.log("after  mergeSort (new):", merged);
  console.log("original stays same   :", nums3);

  const nums4 = [3, 1, 2, 2, 0, -1];
  console.log("\nbefore quickSort:", nums4);
  quickSort(nums4);
  console.log("after  quickSort:", nums4);

  const nums5 = [3, 1, 2, 2, 0, -1];
  console.log("\nbefore heapsort:", nums5);
  heapsort(nums5);
  console.log("after  heapsort:", nums5);
}
