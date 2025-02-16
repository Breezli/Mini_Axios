import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'

function axios(config: AxiosRequestConfig): AxiosPromise {
  // axios 函数接收一个 config 参数
  processConfig(config)
  return xhr(config).then(res => {
    //请求结束后对 response data 进行处理
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  // 处理 config
  config.url = transformURL(config)
  config.headers = transformHeaders(config) // 先处理 headers
  config.data = transformRequestData(config) // 再处理 data
}

function transformURL(config: AxiosRequestConfig): string {
  // 处理 url 返回拼接后的 url
  const { url, params } = config
  return bulidURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): void {
  // 处理 data 调用 transformRequest 方法
  config.data = transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // 处理 headers 调用 processHeaders 方法
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // 处理 response data
  res.data = transformResponse(res.data)
  return res
}

export default axios
