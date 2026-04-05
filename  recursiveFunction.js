// 배열의 모든 요소의 합을 구하는 함수
// 뒤에서부터
function sumArray1(arr) {
  const i = arr.length;
  if (i === 0) return 0;
  return arr[i - 1] + sumArray1(arr.slice(0, i - 1));
}
// 배열의 모든 요소의 합을 구하는 함수
// 앞에서부터
function sumArray2(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray2(arr.slice(1));
}

// 숫자 x와 지수 n을 입력받아 x^n을 계산하는 함수
function power(x, n) {
  if (n === 0) return 1;
  return x * power(x, n - 1);
}
// 숫자 x와 지수 n을 입력받아 x^n을 계산하는 함수
// 분할 재귀
function power2(x, n) {
  if (n === 0) return 1;
  if (n % 2 === 0) {
    const half = power2(x, n / 2);
    return half & half;
  } else return x * power2(x, n - 1);
}
