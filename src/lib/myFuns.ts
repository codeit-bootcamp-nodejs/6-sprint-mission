export function isEmptyArray(v: any) {
  if (Array.isArray(v)) return v.length === 0;
}

export function isEmptyObject(v: any) {
  if (v === null) return true;
  if (typeof v === 'object') return Object.keys(v).length === 0;
}

export function isEmptyString(v: any) {
  if (typeof v === 'string') return v.length === 0;
}

export function isEmpty(v: any) {
  if (v === undefined) return true;
  return Boolean(isEmptyObject(v) || isEmptyArray(v) || isEmptyString(v));
}

export function print(message: string) {
  console.log('');
  console.log(message);
  console.log('');
}
