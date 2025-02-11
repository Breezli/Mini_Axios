import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL(url: string, params?: any): string {
  if (!params) {
    // 没有参数 直接返回 url
    return url
  }
  const parts: string[] = [] //存放参数的数组
  Object.keys(params).forEach(key => {
    // 遍历 params 对象的 key
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      // 如果 value 为 null 或 undefined 直接返回
      return
    }
    let values = [] // 定义 values 变量
    if (Array.isArray(val)) {
      // 如果 value 为数组 直接赋值给 values
      values = val
      key += '[]' // 键名后面添加一个 []
    } else {
      values = [val] // 赋值给 values
    }
    values.forEach(val => {
      // 遍历 values
      if (isDate(val)) {
        // 如果 value 为日期 直接赋值给 val
        val = val.toISOString() // 赋值给 val 并转换为 ISO 格式
      } else if (isPlainObject(val)) {
        // 如果 value 为对象 直接赋值给 val
        val = JSON.stringify(val) // 赋值给 val 并转换为字符串
      }
      parts.push(`${encode(key)}=${encode(val)}`) // 特殊字符转码赋值给 parts
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 如果 serializedParams 不为空 则拼接 url
    const markIndex = url.indexOf('#') // 查找 URL 中是否存在 # 符号 返回 # 符号在 URL 中的位置索引
    if (markIndex !== -1) {
      url = url.slice(0, markIndex) //使用slice方法将URL截取到哈希部分之前，从而去除哈希部分
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
