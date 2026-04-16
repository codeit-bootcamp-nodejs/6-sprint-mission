const test = require("node:test");
const assert = require("node:assert/strict");
const {
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapsort,
} = require("./sorts.js");

function assertSorted(arr, msg) {
  for (let i = 1; i < arr.length; i++) {
    assert.ok(arr[i - 1] <= arr[i], msg);
  }
}

const samples = [
  [],
  [1],
  [3, 1, 2],
  [5, 5, 5],
  [9, -1, 0, 7, 2],
];

for (const name of ["selectionSort", "insertionSort", "quickSort", "heapsort"]) {
  const fn = { selectionSort, insertionSort, quickSort, heapsort }[name];
  test(`${name}: 오름차순`, () => {
    for (const orig of samples) {
      const arr = orig.slice();
      fn(arr);
      assertSorted(arr, `${name} ${JSON.stringify(orig)}`);
    }
  });
}

test("mergeSort: 새 배열 반환, 원본 불변", () => {
  const orig = [3, 1, 2];
  const copy = orig.slice();
  const sorted = mergeSort(orig);
  assert.deepEqual(orig, copy);
  assert.deepEqual(sorted, [1, 2, 3]);
});

test("mergeSort: 빈 배열과 단일 요소", () => {
  assert.deepEqual(mergeSort([]), []);
  assert.deepEqual(mergeSort([42]), [42]);
});
