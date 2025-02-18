import { AxiosRequestConfig, AxiosPromise, AxiosResponse, Method,ResolvedFn,RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)//resolved是一个函数类型 接收一个AxiosRequestConfig类型的参数 返回一个AxiosPromise类型的参数
  rejected?: RejectedFn //rejected是一个函数类型 接收一个AxiosRequestConfig类型的参数 返回一个AxiosPromise类型的参数
}

export default class Axios {
  interceptors: Interceptors
  constructor() {
    this.interceptors = {
      //用户可以通过axios.interceptors.request.use()添加拦截器
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  request(url: any, config: any): AxiosPromise {
    // 实现request方法传入参数
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain:PromiseChain<any>[] = [
      {
        // 创建一个数组chain
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptors.request.forEach(interceptor => {
      // 遍历request拦截器
      chain.unshift(interceptor) // 将拦截器添加到chain数组的开头 
    })
    this.interceptors.response.forEach(interceptor => {
      // 遍历response拦截器
      chain.push(interceptor) // 将拦截器添加到chain数组的末尾
    })
    let promise = Promise.resolve(config) // 创建一个promise对象 并传入config参数
    while (chain.length) {
      // 遍历chain数组
      const { resolved, rejected } = chain.shift()! // 取出chain数组的第一个元素
      promise = promise.then(resolved, rejected) // 将promise对象的then方法传入resolved和rejected参数
    }

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
