import { isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

const strats = Object.create(null)//合并策略 key为属性名 value为合并策略函数

function defaultStrat(val1: any, val2: any): any {//默认合并策略
  return typeof val2 !== 'undefined' ? val2 : val1//优先取val2 如果val2不存在则取val1
}
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {//忽略val1 只取val2
    return val2
  } 
}
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {//如果val2是对象
    return deepMerge(val1, val2)//递归合并
  } else if (typeof val2!== 'undefined') {//如果val2不是对象 且val2存在
    return val2
  } else if (isPlainObject(val1)) {//如果val2不是对象 且val2不存在 且val1是对象
    return deepMerge(val1)//递归合并
  } else if (typeof val1!== 'undefined') {//如果val2不是对象 且val2不存在 且val1不是对象 且val1存在
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {//对于url params data属性 只取val2
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {//对于headers auth属性 深度合并
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)//合并后的配置结果

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat//合并策略
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
