export function addParams(url, params) {
  if (Object.keys(params).length) {
    url += '/?';
    for (let i = 0; i < Object.keys(params).length; i++) {
      url += Object.keys(params)[i];
      url += '=';
      url += Object.values(params)[i];
      if (i < Object.keys(params).length - 1) url += '&';
    }
  }
  return url;
}

export function makePrivateVisible(item) {
  return JSON.parse(JSON.stringify(item, null));
}

export function print(str) {
  console.log(str);
}

export class maskStr {
  static start = (str, nSparedDigits) =>
    str.slice(-nSparedDigits).padStart(str.length, '*');
  static end = (str, nSparedDigits) =>
    str.slice(0, nSparedDigits).padEnd(str.length, '*');
}

export class ArrFuns {
  static sum = (arr) => arr.reduce((accum, n) => accum + n, 0);
  static avg = (arr) => ArrFuns.sum(arr) / arr.length;
  static multiply = (arr, multipleNO) => arr.map((n) => n * multipleNO);
  static sortUP = (arr) => arr.sort((a, b) => a - b);
  static sortDW = (arr) => arr.sort((a, b) => b - a);
  static makeIndexArr = (arr) => [...arr.keys()];
}

// const myArr = [10, 4, 9, 14, -4, 1000, 44];
// console.log(ArrFuns.sum(myArr));
// console.log(ArrFuns.avg(myArr));
// console.log(ArrFuns.multiply(myArr, 10));
// console.log(ArrFuns.sortUP(myArr));
// console.log(ArrFuns.sortDW(myArr));
// console.log(ArrFuns.makeIndexArr(myArr));

export class StrFuns {
  static sortUP = (str) => [...str].sort().join('');
  static sortDW = (str) => [...str].sort().reverse().join('');
  static reverse = (str) => str.split('').reverse().join('');
  static unique = (str) => [...new Set(str)].join('');
  static trimAll = (str) => [...str].filter((n) => n !== ' ').join('');
  static subtractChar = (str, char) =>
    [...str].filter((n) => n !== char).join('');
  static replaceChar = (str, ch1, ch2) =>
    [...str].map((n) => (n === ch1 ? ch2 : n)).join('');
  static maskStart = (str, nSparedDigits) =>
    str.slice(-nSparedDigits).padStart(str.length, '*');
  static maskEnd = (str, nSparedDigits) =>
    str.slice(0, nSparedDigits).padEnd(str.length, '*');
  static padStart = (str, nStrDesired) => str.padStart(nStrDesired, ' ');
  static padEnd = (str, nStrDesired) => str.padEnd(nStrDesired, ' ');
}

// const myStr = 'I am very hungry right now!';
// console.log(StrFuns.sortUP(myStr));
// console.log(StrFuns.sortDW(myStr));
// console.log(StrFuns.reverse(myStr));
// console.log(StrFuns.unique(myStr));
// console.log(StrFuns.trimAll(myStr));
// console.log(StrFuns.subtractChar(myStr, 'o'));
// console.log(StrFuns.replaceChar(myStr, 'o', 'O'));
