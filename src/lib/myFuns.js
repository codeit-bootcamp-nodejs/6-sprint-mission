export function isEmptyArray(v) {
  return Array.isArray(v) && v.length === 0;
}

export function isEmptyObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0;
}

export function isEmptyString(v) {
  return typeof v === 'string' && v.length;
}

export function isEmpty(v) {
  return isEmptyArray(v) && isEmptyObject(v) && isEmptyString(v);
}

export function print(message) {
  console.log('');
  console.log(message);
}
