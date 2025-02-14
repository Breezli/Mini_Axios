import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config // 解构赋值拿到变量
  const request = new XMLHttpRequest() // 实例化一个 XMLHttpRequest 对象 并赋值给 request 变量
  request.open(method.toUpperCase(), url, true) // 调用 open 方法 并传入 method url true 三个参数 并将 method 转换为大写并赋值给 method,url. async:true异步
  
  Object.keys(headers).forEach(name => { // 遍历 headers 的所有属性
    if (data=== null && name.toLowerCase() === 'content-type') {// 如果 data 为 null 并且属性名为 content-type
      delete headers[name]// 删除 headers 的属性名
    }else {
      request.setRequestHeader(name, headers[name])// 调用 setRequestHeader 方法 并传入 name headers[name] 两个参数 并赋值给 request 变量
    }
  })

  request.send(data) // 调用 send 方法 并传入 data 参数 并赋值给 request 变量
}
