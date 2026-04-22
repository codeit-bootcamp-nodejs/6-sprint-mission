export function uniqueRandom(max, count = 1) {
  const realMax = max + 1;
  const maxCount = realMax * 2 - 1;

  if (count > maxCount) {
    throw new Error("요청한 갯수가 가능한 범위를 초과");
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
