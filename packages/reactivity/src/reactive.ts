
import { getActiveEffect } from './effect';
// 维护一个 effect 调用的函数
const bucket = new Set()
export function reactive(target: object) {
  const observed = new Proxy(target, {
    get(target, key) {

      bucket.add(getActiveEffect())
      return target[key]
    },
    set(target, key, val) {
      target[key] = val
      bucket.forEach(fn => fn())
      return true
    }
  })
  return observed
}
