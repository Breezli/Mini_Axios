const toString = Object.prototype.toString
export function isDate(val: any): val is Date {
  // 判断是否为日期
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   // 判断是否为对象
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  // 判断是否为普通对象
  return toString.call(val) === '[object Object]'
}
