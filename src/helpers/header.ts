import { isPlainObject } from './util'

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
