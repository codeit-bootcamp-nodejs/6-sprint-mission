// 테스트용 배열
const testArray = [5, 3, 8, 4, 2];

// 선택정렬 (Selection Sort)

function selectionSort(arr) {
  console.log('\n=== Selection Sort 시작 ===');
  const a = [...arr];

  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i;
    console.log(`\n[i=${i}] 현재 배열:`, a);

    for (let j = i + 1; j < a.length; j++) {
      console.log(`  j=${j} 비교: ${a[j]} < ${a[minIndex]}`);
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      console.log(`  swap: ${a[i]} ↔ ${a[minIndex]}`);
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
    }
  }

  console.log('결과:', a);
  return a;
}

// 삽입정렬 (Insertion Sort)
function insertionSort(arr) {
  console.log('\n=== Insertion Sort 시작 ===');
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let current = a[i];
    let j = i - 1;

    console.log(`\n[i=${i}] current=${current}, 배열:`, a);

    while (j >= 0 && a[j] > current) {
      console.log(`  ${a[j]} > ${current} → 이동`);
      a[j + 1] = a[j];
      j--;
    }

    a[j + 1] = current;
    console.log('  삽입 후:', a);
  }

  console.log('결과:', a);
  return a;
}

// 병합정렬 (Merge Sort)
function mergeSort(arr) {
  console.log('mergeSort 호출:', arr);

  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  const merged = merge(sortedLeft, sortedRight);
  console.log('merge 결과:', merged);

  return merged;
}

function merge(left, right) {
  console.log(`  merge(${left}, ${right})`);

  const result = [];
  let i = 0;
  let j = 0; // 🔥 수정된 부분

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  result.push(...left.slice(i));
  result.push(...right.slice(j));

  return result;
}

// 퀵정렬 (Quick Sort)
function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start === 0 && end === arr.length - 1) {
    console.log('\n=== Quick Sort 시작 ===');
  }

  if (start < end) {
    const pivotIndex = partition(arr, start, end);
    console.log(`pivot 위치: ${pivotIndex}, 배열:`, arr);

    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
  }

  return arr;
}

function partition(arr, start, end) {
  const pivot = arr[end];
  console.log(`\npartition: pivot=${pivot}, 범위=[${start},${end}]`);

  let i = start - 1;

  for (let j = start; j < end; j++) {
    console.log(`  비교: ${arr[j]} <= ${pivot}`);
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      console.log('  swap:', arr);
    }
  }

  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  console.log('  pivot swap:', arr);

  return i + 1;
}

console.log('\n원본 배열:', testArray);

selectionSort(testArray);
insertionSort(testArray);
console.log('\n=== Merge Sort 시작 ===');
console.log('결과:', mergeSort([...testArray]));

quickSort([...testArray]);
