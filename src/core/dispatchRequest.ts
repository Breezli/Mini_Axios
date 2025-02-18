import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { bulidURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/header'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // dispatchRequest 函数接收一个 config 参数
  processConfig(config)
  return xhr(config).then(res => {
    //请求结束后对 response data 进行处理
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  // 处理 config
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest) //处理 data
  config.headers = flattenHeaders(config.headers, config.method!) //处理 headers 扁平化
}

function transformURL(config: AxiosRequestConfig): string {
  // 处理 url 返回拼接后的 url
  const { url, params } = config
  return bulidURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // 处理 response data
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
