import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {// 拦截器接口
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {// 拦截器管理类
  private interceptors: Array<Interceptor<T>>// 拦截器数组存放的是拦截器对象 每个对象有两个属性 resolved rejected
  constructor() { // 构造函数 初始化拦截器数组 
    // 拦截器数组中存放的是拦截器对象 每个对象有两个属性 resolved rejected
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {// 添加拦截器
    this.interceptors.push({// 将拦截器对象添加到拦截器数组中
      resolved,
      rejected
    })
    return this.interceptors.length - 1 // 返回拦截器的id 用于删除拦截器
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {// 遍历拦截器
    this.interceptors.forEach(interceptor => {// 遍历拦截器数组
      if (interceptor !== null) {// 判断拦截器是否存在
        fn(interceptor) // 存在则调用fn函数
      }
    })
  }

  eject(id: number): void {// 删除拦截器 通过id删除拦截器
    if (this.interceptors[id]) {// 判断拦截器是否存在
      this.interceptors[id] = null // 存在则将拦截器置为null
    }
  }
}
