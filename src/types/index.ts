export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  //config接口
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]//请求数据转换函数
  transformResponse?: AxiosTransformer | AxiosTransformer[]//响应数据转换函数

  [propName: string]: any //字符串自动索引
}

export interface AxiosResponse<T = any> {
  //response接口
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
  //promise接口
}

export interface AxiosError extends Error {
  //error接口
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig //默认配置
  interceptors: {
    //拦截器
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  //axios接口
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  //axios实例接口 既有函数类型又有属性接口
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> //函数重载
}

export interface AxiosStatic extends AxiosInstance {
  //axios静态接口
  create(config?: AxiosRequestConfig): AxiosInstance //创建axios实例
}

export interface AxiosInterceptorManager<T> {
  //拦截器接口
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number //添加拦截器 返回拦截器id
  eject(id: number): void //删除拦截器 返回拦截器id
}

export interface ResolvedFn<T = any> {
  //成功拦截器接口
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  //失败拦截器接口
  (error: any): any
}

export interface AxiosTransformer {
  //转换接口
  (data: any, headers?: any): any
}
