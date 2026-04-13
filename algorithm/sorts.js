
function SelectionSort(arr) {
    if (!Array.isArray(arr) || !arr.every(item => typeof item === 'number')) {
        throw new TypeError("매개변수는 오직 숫자형 배열만 허용됩니다.");
    }

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                if (arr[j] < arr[minIndex])
                    minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}
let nums = [3, 1, 2];
console.log(nums);
SelectionSort(nums);
console.log(nums);

function InsetionSort(arr) {
    if (!Array.isArray(arr) || !arr.every(item => typeof item === 'number')) {
        throw new TypeError("매개변수는 오직 숫자형 배열만 허용됩니다.");
    }
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}
nums = [3, 1, 2];
console.log(nums);
InsetionSort(nums);
console.log(nums);

function MergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const sortedLeft = MergeSort(left);
    const sortedRight = MergeSort(right);
    return Merge(sortedLeft, sortedRight);
}

function Merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    result.push(...left.slice(i));
    result.push(...right.slice(j));
    return result;
}
let mergeNums = [3, 1, 2, 5, 4];
console.log(mergeNums);
let sortedMergeNums = MergeSort(mergeNums);
console.log(sortedMergeNums);


function QuickSort(arr, start = 0, end = null) {
    if (end === null) {
        end = arr.length - 1;
    }

    if (start < end) {
        const pivotIndex = partition(arr, start, end);

        // Conquer 단계
        QuickSort(arr, start, pivotIndex - 1);
        QuickSort(arr, pivotIndex + 1, end);
    }
}

function partition(arr, start, end) {
    const pivot = arr[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
    return i + 1;
}
let quickNums = [3, 1, 2, 5, 4];
console.log(quickNums);
QuickSort(quickNums);
console.log(quickNums);
