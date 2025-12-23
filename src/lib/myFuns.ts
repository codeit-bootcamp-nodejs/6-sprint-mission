export function isEmptyArray<T>(v: T[]): Boolean {
  if (Array.isArray(v)) return v.length === 0;
  else return false;
}

export function isEmptyObject(v: object): Boolean {
  if (typeof v === 'object') return Object.keys(v).length === 0;
  else return false;
}

export function isEmpty(v: any): Boolean {
  if (v === undefined) return true;
  return Boolean(isEmptyObject(v) || isEmptyArray(v));
}

export function print(message: string): void {
  console.log('');
  console.log(message);
  console.log('');
}

export function includedOk<T, K extends keyof T>(myArray: T[], myKey: K, myValue: T[K]): Boolean {
  return myArray.some((n) => n[myKey] === myValue);
}
