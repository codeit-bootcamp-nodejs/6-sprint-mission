//선택 정렬 (Selection Sort)
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

//삽입 정렬 (Insertion Sort)
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
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

// 병합 정렬 (Merge Sort)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

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
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

//퀵 정렬 (Quick Sort)

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;

  const pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
  return arr;
}

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

// 테스트 코드
function testSorting() {
  const testCases = [
    [5, 3, 8, 4, 2, 1, 9, 7, 6],
    [3, 1, 2],
    [10, -1, 0, 5, 2],
    [],
  ];

  console.log("--- 선택 정렬 (Selection Sort) ---");
  testCases.forEach((tc) => {
    const arr = [...tc];
    selectionSort(arr);
    console.log(`Input: [${tc}] -> Result: [${arr}]`);
  });

  console.log("\n--- 삽입 정렬 (Insertion Sort) ---");
  testCases.forEach((tc) => {
    const arr = [...tc];
    insertionSort(arr);
    console.log(`Input: [${tc}] -> Result: [${arr}]`);
  });

  console.log("\n--- 병합 정렬 (Merge Sort) ---");
  testCases.forEach((tc) => {
    const result = mergeSort(tc);
    console.log(`Input: [${tc}] -> Result: [${result}] (New Array)`);
  });

  console.log("\n--- 퀵 정렬 (Quick Sort) ---");
  testCases.forEach((tc) => {
    const arr = [...tc];
    quickSort(arr);
    console.log(`Input: [${tc}] -> Result: [${arr}]`);
  });
}

testSorting();
