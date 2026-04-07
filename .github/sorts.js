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

module.exports = { selectionSort, insertionSort, mergeSort, quickSort };

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
}
