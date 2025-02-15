import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // xhr 函数接收一个 config 参数
  return new Promise((resolve, reject) => {
    // 返回一个 Promise 对象 并传入 resolve reject 两个参数
    const { data = null, url, method = 'get', headers, responseType } = config // 解构赋值拿到变量
    const request = new XMLHttpRequest() // 实例化一个 XMLHttpRequest 对象 并赋值给 request 变量

    if (responseType) {// 如果 responseType 存在
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true) // 调用 open 方法 并传入 method url true 三个参数 并将 method 转换为大写并赋值给 method,url. async:true异步

    request.onreadystatechange = function handleLoad() {
      // 调用 onreadystatechange 方法 并传入 handleLoad 函数 并赋值给 request 变量
      if (request.readyState !== 4) {
        // 没有收到正确的响应
        return
      }
      const responseHeaders = request.getAllResponseHeaders() // 调用 getAllResponseHeaders 方法 并赋值给 responseHeaders 变量
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText // 调用 responseText 方法 并赋值给 responseData 变量
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response) // 调用 resolve 方法 并传入 response 参数
    }

    Object.keys(headers).forEach(name => {
      // 遍历 headers 的所有属性
      if (data === null && name.toLowerCase() === 'content-type') {
        // 如果 data 为 null 并且属性名为 content-type
        delete headers[name] // 删除 headers 的属性名
      } else {
        request.setRequestHeader(name, headers[name]) // 调用 setRequestHeader 方法 并传入 name headers[name] 两个参数 并赋值给 request 变量
      }
    })

    request.send(data) // 调用 send 方法 并传入 data 参数 并赋值给 request 变量
  })
}
