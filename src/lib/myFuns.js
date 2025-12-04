export function isEmptyArray(v) {
  if (Array.isArray(v)) return v.length === 0;
}

export function isEmptyObject(v) {
  if (v === null) return true;
  if (typeof v === 'object') return Object.keys(v).length === 0;
}

export function isEmptyString(v) {
  if (typeof v === 'string') return v.length === 0;
}

export function isEmpty(v) {
  if (v === undefined) return true;
  return Boolean(isEmptyObject(v) || isEmptyArray(v) || isEmptyString(v));
}

export function print(message) {
  console.log('');
  console.log(message);
  console.log('');
}
