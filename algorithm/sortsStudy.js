// 선택 정렬 (Selection sort)
// - 전체 배열에서 가장 작은 값을 찾아내어, 아직 정렬되지 않은 부분의 가장 앞자리에 있는 값과 교환하는 방식
// - 예시) [5,3,1,2,4]
//   1. 가장 작은 값 1 찾음, 맨 앞에 5와 비교 => [1,3,5,2,4]
//   2. 나머지 배열 [3,5,2,4]에서 가장 작은 값 2 찾음, 맨 앞에 3과 비교 => [1,2,5,3,4]
//   3. 2번 방식을 반복하여 최종적으로 [1,2,3,4,5]가 되면 정지

// 문제 1) 선택 정렬 : 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

console.log("=-.-=-.-=-.-=-.-= 선택 정렬 =-.-=-.-=-.-=-.-=");

function selectionSort(arr) {
  console.log(`최초 배열 : ${arr}`);

  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    // 전체 최솟값을 찾으려면 루프를 꼭 돌아야 함
    // 따라서 최초에는 0번째 인덱스를 기준점으로 삼고 시작

    let minIndex = i; // 최소값 인덱스 설정, 초기에는 0번 인덱스로 시작

    // 이후의 배열을 순회하며 진짜 최솟값을 찾음 = 루프
    // 루프는 이미 설정 된 인덱스를 제외하고 진행 = "let j = i + 1" 구문!
    for (let j = i + 1; j < arr.length; j++) {
      // 현재 설정된 최소값 인덱스 vs 전체 배열 비교
      if (arr[j] < arr[minIndex]) {
        // 더 작은 값 확인 => 최소값 인덱스 업데이트
        minIndex = j;
      }
    }

    // 루프를 돌고 난 뒤, 최소값 인덱스가 바뀌었는지 확인
    if (minIndex !== i) {
      // 최소값 인덱스가 바뀌었다면, [현재 인덱스]와 [최소값 인덱스] 값을 교환
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    console.log(`${i + 1}번쨰 정렬 : ${arr}`);

    // 배열 : [5, 3, 1, 2, 4]
    // 1회전 (i=0): 처음 인덱스 0의 값 "5", 루프 후 변경된 인덱스 2의 값 "1" 찾음 -> "5"와 "1" 교환 -> [1, 3, 5, 2, 4]
    // 2회전 (i=1): 처음 인덱스 1의 값 "3", 루프 후 변경된 인덱스 3의 값 "2" 찾음 -> "3"과 "2" 교환 -> [1, 2, 5, 3, 4] ...
  }
}

const nums1 = [5, 3, 1, 2, 4];
selectionSort(nums1);
console.log(`선택 정렬 결과 : ${nums1}`);
console.log(""); // 가독성을 위한 공백

// =========================================

// 삽입 정렬 (Insertion sort)
// - 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬 된 앞부분과 비교하여, 자신의 적절한 위치를 찾아 삽입하는 방식
// - 예시) [5,3,1,2,4]
//   1. 첫 번째 요소 5는 이미 정렬된 것으로 간주하고 시작한다 [5,3,1,2,4]
//   2. 두 번째 요소 3은 앞부분 [5]와 비교하여 자리를 이동한다 => [(3,5),1,2,4]
//   3. 세 번째 요소 1은 앞부분 [3,5]와 비교하여 자리를 이동한다 => [(1,3,5),2,4]
//   4. ... 이 과정을 반복하여 최종적으로 [1,2,3,4,5]가 되면 정지

// 문제 2) : 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

console.log("=-.-=-.-=-.-=-.-= 삽입 정렬 =-.-=-.-=-.-=-.-=");
function insertionSort(arr) {
  console.log(`최초 배열 : ${arr}`);

  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    let targetVal = arr[i]; // 현재 정렬할 타겟 값
    let j = i - 1;
    // i : 현재 인덱스 , j : 비교할 인덱스

    // 비교 대상 인덱스가 0 이상이고(-1 = 비교대상 없음 , while문 종료 조건)
    // 현재 타겟값이 비교대상 인덱스의 값보다 작으면 실행
    while (j >= 0 && arr[j] > targetVal) {
      console.log(`현재 요소 : ${targetVal}, 앞 요소 : ${arr[j]}`);

      // 현재 인덱스에 비교대상 값을 넣어줌 (오른쪽으로 한 칸 이동)
      arr[j + 1] = arr[j];

      console.log(`현재 배열 : ${arr}`);

      // 비교 인덱스를 감소 시켜서 다음 비교를 준비
      j--;
    }

    // 만약 현재 인덱스와 비교 대상 인덱스 비교 했을 때 동일하거나, 더 크면 while문이 종료 되고,
    // 멈춘 자리의 다음 인덱스에 현재 타겟 값을 넣어주는 것
    // 배열 : 1,3,5,2,4 -> i = 3, j = 2, "2" 타겟
    // 현재 요소 : 2, 앞 요소 : 5
    // 현재 배열 : 1,3,5,5,4 -> 2 vs 5 해서 5가 더 크므로 j+1 = 3번째 인덱스에 5를 넣어줌, j-- = 1
    // 현재 요소 : 2, 앞 요소 : 3
    // 현재 배열 : 1,3,3,5,4 -> 2 vs 3 해서 3이 더 크므로 j+1 = 2번째 인덱스에 3를 넣어줌, j-- = 0
    // 순회 후 배열 : 1,2,3,5,4 -> 2 vs 1 해서 1이 더 크므로 while문 종료, 멈춘 자리 인덱스 j = 0 의 다음 인덱스 1에 2를 넣어줌

    arr[j + 1] = targetVal;
    console.log(`순회 후 배열 : ${arr}`);
    console.log(""); // 가독성을 위한 공백
  }
}

const nums2 = [5, 3, 1, 2, 4];
insertionSort(nums2);
console.log(`삽입 정렬 결과 : ${nums2}`);
console.log(""); // 가독성을 위한 공백

// =========================================

// 병합 정렬 (Merge sort)
// - 분할 정복의 정석,배열을 더이상 쪼갤수 없을 때 까지 절반으로 나눈 뒤, 다시 합치면서 정렬하는 방식
// - 예시) [5,3,1,2,4]
//   1. 배열을 반으로 나눈다 => [5,3] | [1,2,4]
//   2. 나눈 2개 배열을 반으로 또 나눈다 => [5] , [3] | [1] , [2,4]
//   3. 아직도 나눌게 남아 있다면 또 반으로 나눈다 => [5] , [3] | [1] / [2] , [4]
//   4. 나눴던 순서대로 비교해서 합친다 => [3,5] | [1] / [2,4]
//   5. 마지막까지 합친다 => [3,5] | [1,2,4] => [1,2,3,4,5]

// 문제 3) 병합 정렬 : 숫자형 배열을 파라미터로 받고, 정렬된 새로운 배열을 리턴하도록 구현합니다.

console.log("=-.-=-.-=-.-=-.-= 병합 정렬 =-.-=-.-=-.-=-.-=");

function mergeSort(arr) {
  console.log(`최초 배열 : ${arr}`);

  if (arr.length <= 1) {
    return arr;
  }

  // 배열을 분할
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // 각 부분을 재귀적으로 정렬
  const sortedLeft = mergeSort(left); // 왼쪽 배열이 1개가 될 때까지 반복 => 예) [1,8,5,3] -> [1,8] | [5,3] -> [1]| [8] | [5]| [3]
  const sortedRight = mergeSort(right); // 오른쪽 배열이 1개가 될 때까지 반복

  console.log(`정렬된 왼쪽 배열 : ${sortedLeft}`);
  console.log(`정렬된 오른쪽 배열 : ${sortedRight}`);

  // 정렬된 두 배열을 합침
  return merge(sortedLeft, sortedRight);
}

// 병합(Merge)을 담당하는 헬퍼 함수
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // 두 배열의 요소를 비교하며 작은 순서대로 result에 담음
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // 남은 요소가 있다면 (한쪽 배열이 먼저 끝난 경우) 나머지를 모두 붙여줌
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const nums3 = [5, 8, 3, 2, 7, 1, 4, 9, 6];
const result3 = mergeSort(nums3);
console.log(`병합 정렬 결과 : ${result3}`);
console.log(""); // 가독성을 위한 공백

// =========================================

// 퀵 정렬 (Quick sort)
// - 하나의 기준점을 정하고, 그보다 작은 값은 왼쪽 / 큰값은 오른쪽으로 옮기면서 정렬을 진행한다.
// - 예시) [5,8,3,2,7,1,4,9,6]
//   1. 임으로 기준점을 정한다. => 기준 : 3
//   2. 3보다 작은 값은 왼쪽 / 큰값은 오른쪽으로 옮긴다. => [2,1] , 3 , [5,8,7,4,9,6]
//      3. 왼쪽 배열 먼저 정렬한다 => [1,2] , 3 , [5,8,7,4,9,6]
//      4. 오른쪽 배열을 정리하는데, 값이 많으므로 새로운 임의 기준점을 정하고 정렬한다 => 기준 : 8, 현재 상태 : [1,2,3] | [5,8,7,4,9,6]
//         5. 8보다 작은 값은 왼쪽 / 큰값은 오른쪽으로 옮긴다. => [1,2,3] | [5,7,4,6] , 8 , [9]
//            6. 왼쪽 배열 먼저 정렬한다, 아직 값이 많으므로 임으로 7을 기준으로 잡는다
//               => 기준 : 7 , [5,7,4,6] => [5,4,6] , 7 , []
//            7. 나머지 오른쪽 배열을 정렬한다. 정렬이 필요 없으면 고정한다 => [1,2,3] | [5,4,6] , 7 , [] | 8 , [9] => [1,2,3] | [5,4,6] , 7 , [] | [8,9]
//   8. ... 이런 방식을 반복하여 최종적으로 [1,2,3,4,5,6,7,8,9]가 되면 정지

// 문제 4) 퀵 정렬 : 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

console.log("=-.-=-.-=-.-=-.-= 퀵 정렬 =-.-=-.-=-.-.-.-=");

function quickSort(arr, left = 0, right = arr.length - 1) {
  // 재귀 함수에서는 현재 내가 작업해야 할 **범위(State)**를 반드시 매개변수로 넘겨받고 활용해야 하므로,
  // 다른 함수와 다르게 left와 right를 매개변수로 받는다.

  if (left >= right) {
    return;
  }

  // partition()을 통해 좌우를 나눔
  // - 피벗보다 작은 값은 왼쪽, 큰 값은 오른쪽으로 배치
  const pivotIndex = partition(arr, left, right);

  // 피벗을 제외한 왼쪽과 오른쪽 부분을 재귀함수로 정렬
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
}

// 분할(Partition)을 담당하는 헬퍼 함수
function partition(arr, left, right) {
  // 간단하게 가장 오른쪽 요소를 피벗으로 선택
  const pivot = arr[right];
  let i = left; // 피벗보다 작은 값이 들어갈 위치 인덱스

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      // 피벗보다 현재 요소가 작다면 i번째 요소와 교환
      console.log(`현재 요소 : ${arr[j]}, 정렬 대상 : ${arr[i]}, 피벗 요소 : ${pivot}`);

      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      console.log(`현재 배열 : ${arr}`);
    }
  }

  // 마지막으로 피벗을 자신의 위치(i)로 이동
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i; // 피벗의 최종 위치 반환
}

const nums4 = [5, 8, 3, 2, 7, 1, 4, 9, 6];
quickSort(nums4);
console.log(`퀵 정렬 결과 : ${nums4}`);

// =========================================

console.log("=-.-=-.-=-.-=-.-= 힙 정렬 =-.-=-.-=-.-.-.-=");

// 힙 정렬 (Heap sort)
// 숫자형 배열을 받아서 받은 배열을 정렬된 상태로 수정

// 핵심 키워드 :
// - Max Heap(최대 힙): 부모 노드의 값이 자식 노드의 값보다 크거나 같은 완전 이진 트리
// - Heapify(힙 생성/유지): 특정 노드를 기준으로 힙의 성질을 만족하도록 트리 구조를 재배치하는 과정
// - In-place(제자리 정렬): 입력 배열 외에 추가적인 메모리 공간을 거의 사용하지 않아 메모리 효율이 뛰어남
// - Unstable(불안정 정렬): 동일한 값들의 상대적인 순서가 유지되지 않을 수 있는 특성

function heapSort(arr) {
  const n = arr.length;

  // 1. 최대 힙 구성 (Build Max Heap)
  // 배열의 중간(마지막 자식이 있는 노드)부터 루트까지 거꾸로 올라가며 힙을 만듭니다.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 2. 하나씩 요소를 힙에서 꺼내어 배열 끝으로 보냄 (Extract elements)
  for (let i = n - 1; i > 0; i--) {
    // 현재 루트(최대값)를 정렬되지 않은 영역의 마지막 요소와 교체
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // 루트가 바뀌었으므로, 줄어든 범위(i)에 대해 다시 힙 성질을 복구
    heapify(arr, i, 0);
  }
}

// 힙의 성질을 관리하는 핵심 헬퍼 함수
function heapify(arr, n, i) {
  let largest = i; // 루트가 가장 크다고 가정
  let left = 2 * i + 1; // 왼쪽 자식 인덱스
  let right = 2 * i + 2; // 오른쪽 자식 인덱스

  // 왼쪽 자식이 부모보다 크다면 largest 갱신
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // 오른쪽 자식이 현재 largest보다 크다면 largest 갱신
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // largest가 루트(i)가 아니라면 자식과 교체하고, 교체된 자식 노드에 대해 재귀적으로 heapify 수행
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // 영향받는 서브트리를 다시 힙으로 만듦
    heapify(arr, n, largest);
  }
}

// ======================================
// 테스트 코드 (검증)
// ======================================

const numsHeap = [4, 10, 3, 5, 1];
console.log(`힙 정렬 전 배열 : ${numsHeap}`);
heapSort(numsHeap);
console.log(`힙 정렬 후 배열 : ${numsHeap}`);
