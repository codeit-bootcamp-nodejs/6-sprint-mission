let myArray;

// 선택 정렬 (Selection sort)
// 2개의 for loop 사용. 각 중첩 loop의 최소값을 왼편으로 보냄
// 첫번째 중첩 loop에서 전체 최소값을 0자리로, 두번째 중첩 loop에서 두번째 최소값을 1자리로... 등등
// 시간 복잡도: O(n2)
// 공간 복잡도: O(1)
// 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) if (arr[j] < arr[minIndex]) minIndex = j;
    if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
}
console.log('');
console.log('Selection Sort');
myArray = uniqueRandom(10, 6);

console.log(myArray);
selectionSort(myArray);
console.log(myArray);

// 삽입 정렬 (Insertion sort)
// curr와 왼쪽의 것을 비교헤서 왼쪽이 더 크면 오른쪽으로 옮기는 방식: shift
// 시간복잡도: O(n2)
// 공간복잡도: O(1)
// 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const curr = arr[i];
    let j = i - 1;

    while (j >= 0) {
      if (arr[j] > curr) arr[j + 1] = arr[j];
      else break;
      j--;
    }
    arr[j + 1] = curr;
  }
}

console.log('');
console.log('Insertion Sort');
myArray = uniqueRandom(10, 6);

console.log(myArray);
insertionSort(myArray);
console.log(myArray);

//------------------------------------------- Divide & Conquer
// 병합 정렬 (Merge sort)
// 더 이상 쪼갤 수 없는 단위로 쪼갠 후, 순서대로 정렬하며 병합
// 시간 복잡도: O(nlogn)
// 공간 복잡도: O(n): 한 순간에 증가한 메모리 양을 고려
// 숫자형 배열을 파라미터로 받고, 정렬된 새로운 배열을 리턴하도록 구현
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const middleIndex = Math.floor(arr.length / 2);
  const arr_front = arr.slice(0, middleIndex);
  const arr_back = arr.slice(middleIndex);

  const front = mergeSort(arr_front);
  const back = mergeSort(arr_back);

  return merge(front, back);
}

function merge(front, back) {
  const arr = [];
  let i = 0;
  let j = 0;
  while (i < front.length && j < back.length) {
    if (front[i] <= back[j]) {
      arr.push(front[i]);
      i++;
    } else {
      arr.push(back[j]);
      j++;
    }
  }
  arr.push(...front.slice(i));
  arr.push(...back.slice(j));
  return arr;
}

console.log('');
console.log('Merge Sort');
myArray = uniqueRandom(10, 6);

console.log(myArray);
console.log(mergeSort(myArray));

// 퀵 정렬 (Quick sort)
// 끝 요소를 기준으로 더 작은 것은 앞으로 보내는 재귀함수 사용
// 이미 정렬된 배열의 경우가 최악 (예. [1,2,3,4,5])
// 시간복잡도: 편균 O(nlogn), 최악 O(n2)
// 공간복잡도: O(logn), 최악 O(n):  동시에 생성된 메모리 양으로 간주
// 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현
function quickSort(arr, start, end) {
  if (start === undefined) start = 0;
  if (end === undefined) end = arr.length - 1;

  if (start < end) {
    const pivotIndex = part(arr, start, end);
    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
  }
}

function part(arr, start, end) {
  const pivot = arr[end];
  let leftIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] <= pivot) {
      [arr[leftIndex], arr[i]] = [arr[i], arr[leftIndex]];
      leftIndex++;
    }
  }
  [arr[leftIndex], arr[end]] = [pivot, arr[leftIndex]];
  return leftIndex;
}
console.log('');
console.log('Quick Sort');
myArray = uniqueRandom(10, 6);

console.log(myArray);
quickSort(myArray);
console.log(myArray);
console.log('');

//--------------------------------------
function uniqueRandom(max, count = 1) {
  const realMax = max + 1;
  const maxCount = realMax * 2 - 1;

  if (count > maxCount) {
    throw new Error('요청한 갯수가 가능한 범위를 초과');
  }

  const set = new Set();

  while (set.size < count) {
    const num = Math.floor(Math.random() * realMax);
    const signed = num === 0 ? 0 : Math.random() < 0.5 ? num : -num;
    set.add(signed);
  }

  const result = [...set];

  return count === 1 ? result[0] : result;
}
