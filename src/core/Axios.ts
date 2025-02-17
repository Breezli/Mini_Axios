import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    // 实现request方法传入config参数 并返回AxiosPromise
    return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    // 实现get方法传入url和config参数 并返回AxiosPromise
    return this._requestMethodWithoutData('get', url, config) // 调用_requestMethodWithoutData方法 并传入一个对象
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    // 实现delete方法传入url和config参数 并返回AxiosPromise
    return this._requestMethodWithoutData('delete', url, config) // 调用_requestMethodWithoutData方法 并传入一个对象
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    // 实现head方法传入url和config参数 并返回AxiosPromise
    return this._requestMethodWithoutData('head', url, config) // 调用_requestMethodWithoutData方法 并传入一个对象
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    // 实现options方法传入url和config参数 并返回AxiosPromise
    return this._requestMethodWithoutData('options', url, config) // 调用_requestMethodWithoutData方法 并传入一个对象
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    // 实现post方法传入url,data和config参数 并返回AxiosPromise
    return this._requestMethodWithData('post', url, data, config) // 调用_requestMethodWithData方法 并传入一个对象
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    // 实现put方法传入url,data和config参数 并返回AxiosPromise
    return this._requestMethodWithData('put', url, data, config) // 调用_requestMethodWithData方法 并传入一个对象 
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    // 实现patch方法传入url,data和config参数 并返回AxiosPromise
    return this._requestMethodWithData('patch', url, data, config) // 调用_requestMethodWithData方法 并传入一个对象 
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    // 封装_requestMethodWithoutData方法传入method,url和config参数 并返回AxiosPromise
    return this.request(Object.assign(config || {}, { method, url })) // 调用request方法 并传入一个对象
  }
  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    // 封装_requestMethodWithData方法传入method,url,data和config参数 并返回AxiosPromise
    return this.request(Object.assign(config || {}, { method, url, data })) // 调用request方法 并传入一个对象
  } 
}
