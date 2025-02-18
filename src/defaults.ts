import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/header'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  url: '',
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*' //通用的请求头 接受的响应类型为json/plain文本*/*表示任意类型 优先级最低
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data) //处理请求头
      return transformRequest(data) //处理请求数据
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data) //处理响应数据
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {} //没有数据的请求头 优先级高于通用的请求头
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded' //表单提交的请求头 优先级高于通用的请求头
  }
})

export default defaults
