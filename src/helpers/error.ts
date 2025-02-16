import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  //定义一个AxiosError类 继承Error类 并实现AxiosError接口 并设置 isAxiosError为true
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    //构造函数 接收五个参数赋值给对应的属性 并设置 isAxiosError为true
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)//调用父类的构造函数 传入message参数赋值给message属性

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype) // 修复原型链问题
  }
}

export function createError( //定义一个createError函数 接收五个参数 并返回一个AxiosError对象
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
