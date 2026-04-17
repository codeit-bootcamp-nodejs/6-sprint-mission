function heapsort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}

function heapify(arr, size, rootIndex) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < size && arr[left] > arr[largest]) largest = left;
  if (right < size && arr[right] > arr[largest]) largest = right;

  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    heapify(arr, size, largest);
  }
}

const arr1 = [3, 1, 4, 1, 5, 9, 2, 6];
heapsort(arr1);
console.log(arr1); // [1, 1, 2, 3, 4, 5, 6, 9]

const arr2 = [10, -3, 0, 7, -1];
heapsort(arr2);
console.log(arr2); // [-3, -1, 0, 7, 10]
