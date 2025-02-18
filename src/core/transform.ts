import { AxiosTransformer } from '../types'

export default function transform(//transform函数接收data headers fns三个参数
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {//如果没有传入fns 直接返回data
    return data
  }
  if (!Array.isArray(fns)) {//如果fns不是数组 将其转为数组
    fns = [fns]
  }
  fns.forEach(fn => {//遍历fns数组 依次调用fn函数
    data = fn(data, headers)
  })
  return data
}

