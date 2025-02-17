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

export function extend<T, U>(to: T, from: U): T & U {
  // 合并对象
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  // 深度合并对象
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}