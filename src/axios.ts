import { AxiosInstance } from "./types"
import Axios from "./core/Axios"
import { extend } from "./helpers/util"

function createInstance(): AxiosInstance {
  const context = new Axios()//实例化一个 Axios 对象 并赋值给 context 变量
  const instance = Axios.prototype.request.bind(context)//调用 request 方法 并传入 context 参数 并赋值给 instance 变量 绑定 this 指向 context

  extend(instance, context) //调用 extend 方法 并传入 instance 和 context 参数 实现 instance 对象继承 context 对象
  return instance as AxiosInstance //返回 instance 对象 并断言为 AxiosInstance 类型
}

const axios = createInstance() //调用 createInstance 方法 并赋值给 axios 变量

export default axios
