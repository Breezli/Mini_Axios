import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get' } = config// 解构设置默认值
  const request = new XMLHttpRequest()// 实例化一个 XMLHttpRequest 对象 并赋值给 request 变量
  request.open(method.toUpperCase(), url, true)// 调用 open 方法 并传入 method url true 三个参数 并将 method 转换为大写并赋值给 method,url. async:true
  request.send(data)// 调用 send 方法 并传入 data 参数 并赋值给 request 变量
}
