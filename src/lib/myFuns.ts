export function isEmptyArray<T>(v: T[]): boolean {
  if (Array.isArray(v)) return v.length === 0;
  else return false;
}

export function isEmptyObject(v: object): boolean {
  if (typeof v === 'object') return Object.keys(v).length === 0;
  else return false;
}

export function isEmpty(v: any): boolean {
  if (v === undefined) return true;
  return Boolean(isEmptyObject(v) || isEmptyArray(v));
}

export function print(message: string): void {
  console.log('');
  console.log(message);
  console.log('');
}

export function includedOk<T, K extends keyof T>(myArray: T[], myKey: K, myValue: T[K]): boolean {
  return myArray.some((n) => n[myKey] === myValue);
}

export function stripNulls<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null)) as T;
}
