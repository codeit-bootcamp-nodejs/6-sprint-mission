// 주어진 인덱스를 기준으로 최대 힙 조건을 만족하도록 배열을 재배열하는 헬퍼 함수
function heapify(arr, length, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < length && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < length && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // 요소 교환 (Swap)
        heapify(arr, length, largest); // 하위 트리에 대해 재귀적으로 heapify 호출
    }
}

// 숫자형 배열을 받아서 정렬된 상태로 수정하는 함수
function heapsort(arr) {
    const n = arr.length;

    // 최대 힙 구축 (배열의 중간부터 시작하여 루트까지 진행)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 힙에서 요소를 하나씩 추출하여 배열의 끝으로 보내고 정렬
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // 루트(최댓값)를 배열의 끝 요소와 교환
        heapify(arr, i, 0); // 줄어든 힙에 대해 다시 최대 힙 속성 유지
    }

    return arr;
}

module.exports = { heapsort };