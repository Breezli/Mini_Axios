import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'
import { transformRequest } from './helpers/data'
function axios(config: AxiosRequestConfig): void {
  // axios 函数接收一个 config 参数
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  // 处理 config 调用 transformURL 和 transformRequestData 方法
  config.url = transformURL(config)
  config.data = transformRequestData(config)
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

export default axios
