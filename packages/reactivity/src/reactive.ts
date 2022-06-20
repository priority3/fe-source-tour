
// import { getActiveEffect } from './effect';
// // 维护一个 effect 调用的函数
// const bucket = new Set()
// export function reactive(target: object) {
//   const observed = new Proxy(target, {
//     get(target, key) {

//       bucket.add(getActiveEffect())
//       return target[key]
//     },
//     set(target, key, val) {
//       target[key] = val
//       bucket.forEach(fn => fn())
//       return true
//     }
//   })
//   return observed
// }
import {
  mutableHandlers
} from './baseHandlers';

export const reactiveMap = new WeakMap()


export function reactive(target: object) {
  // 调用多次 
  return createdReactiveObject(target, reactiveMap, mutableHandlers)
}

export function shallowReactive(target: object) {

}

function createdReactiveObject(target, proxyMap, proxyHandlers) {
  if (typeof target !== 'object') {
    console.warn("just proxy object");
    return target
  }
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, proxyHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
