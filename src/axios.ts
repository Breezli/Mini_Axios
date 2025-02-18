import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config) //创建一个 Axios 实例 并传入 config 参数 并赋值给 context 变量
  const instance = Axios.prototype.request.bind(context) //调用 request 方法 并传入 context 参数 并赋值给 instance 变量 绑定 this 指向 context

  extend(instance, context) //调用 extend 方法 并传入 instance 和 context 参数 实现 instance 对象继承 context 对象
  return instance as AxiosStatic //返回 instance 对象 并断言为 AxiosStatic 类型
}

const axios = createInstance(defaults) //调用 createInstance 方法 并传入 defaults 参数 并赋值给 axios 变量

axios.create = function create(config) {//axios.create 方法接收一个 config 参数 并返回一个 createInstance 方法的调用结果 并传入 mergeConfig 方法的调用结果 并传入 defaults 和 config 参数
  return createInstance(mergeConfig(defaults, config))
}

export default axios
