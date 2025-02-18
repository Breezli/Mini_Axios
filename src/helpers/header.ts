import { Method } from '../types'
import { deepMerge, isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {// normalizeHeaderName 函数接收 headers 和 normalizedName 两个参数
  if (!headers) {// 如果 headers 不存在
    return// 直接返回
  } 
  Object.keys(headers).forEach(name => {// 遍历 headers 的所有属性
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {// 如果属性名不等于 normalizedName 并且属性名的大写形式等于 normalizedName 的大写形式
      headers[normalizedName] = headers[name]// 将 headers 的属性名设置为 normalizedName (content-type -> Content-Type)
      delete headers[name]// 删除 headers 的属性名
    }
  })
}

export function processHeaders(headers: any, data: any): any {// processHeaders 函数接收 headers 和 data 两个参数
  normalizeHeaderName(headers, 'Content-Type')// 调用 normalizeHeaderName 函数将 headers 的 Content-Type 属性名规范化
  if (isPlainObject(data)) {// 如果 data 是一个普通对象
    if (headers && !headers['Content-Type']) {// 如果 headers 不存在 Content-Type 属性
      headers['Content-Type'] = 'application/json;charset=utf-8'// 设置 Content-Type 属性为 application/json;charset=utf-8
    }
  }
  
  return headers// 返回 headers
}

export function parseHeaders(headers: string): any {// parseHeaders 函数接收 headers 参数
  let parsed = Object.create(null)// 创建一个空对象
  if (!headers) {// 如果 headers 不存在
    return parsed// 返回 parsed
  }
  headers.split('\r\n').forEach(line => {// 遍历 headers 的每一行
    let [key, val] = line.split(':')// 分割每一行的 key 和 val
    key = key.trim().toLowerCase()// 去掉 key 的空格并将 key 转换为小写
    if (!key) {// 如果 key 不存在
      return// 直接返回
    }
    if (val) {// 如果 val 存在
      val = val.trim()// 去掉 val 的空格
    }
    parsed[key] = val// 将 key 和 val 赋值给 parsed
  })
  return parsed// 返回 parsed
}

export function flattenHeaders(headers: any, method: Method): any {// flattenHeaders 函数接收 headers 和 method 参数 将 headers 中的属性名规范化 并删除不必要的属性 并返回一个新的 headers 对象
  if (!headers) {// 如果 headers 不存在
    return headers// 返回 headers
  }
  headers = deepMerge(headers, null)// 调用 deepMerge 函数将 headers 深度合并
  const methodsToDelete = [// 定义一个数组 methodsToDelete 存储需要删除的 headers 属性名
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common',
  ]
  methodsToDelete.forEach(method => {// 遍历 methodsToDelete 数组
    delete headers[method]// 删除 headers 的属性名
  })

  return headers// 返回 headers
}