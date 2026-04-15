function swap(nums, leftIndex, rightIndex) {
  [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]];
}

export function selectionSort(nums) {
  for (let i = 0; i < nums.length - 1; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      swap(nums, i, minIndex);
    }
  }
}

export function insertionSort(nums) {
  for (let i = 1; i < nums.length; i += 1) {
    const current = nums[i];
    let j = i - 1;

    while (j >= 0 && nums[j] > current) {
      nums[j + 1] = nums[j];
      j -= 1;
    }

    nums[j + 1] = current;
  }
}

function merge(left, right) {
  const merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      merged.push(left[leftIndex]);
      leftIndex += 1;
    } else {
      merged.push(right[rightIndex]);
      rightIndex += 1;
    }
  }

  return merged
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

export function mergeSort(nums) {
  if (nums.length <= 1) {
    return [...nums];
  }

  const middle = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, middle));
  const right = mergeSort(nums.slice(middle));

  return merge(left, right);
}

function partition(nums, low, high) {
  const pivot = nums[high];
  let smallerIndex = low;

  for (let i = low; i < high; i += 1) {
    if (nums[i] <= pivot) {
      swap(nums, i, smallerIndex);
      smallerIndex += 1;
    }
  }

  swap(nums, smallerIndex, high);
  return smallerIndex;
}

function quickSortRecursive(nums, low, high) {
  if (low >= high) {
    return;
  }

  const pivotIndex = partition(nums, low, high);

  quickSortRecursive(nums, low, pivotIndex - 1);
  quickSortRecursive(nums, pivotIndex + 1, high);
}

export function quickSort(nums) {
  quickSortRecursive(nums, 0, nums.length - 1);
}
