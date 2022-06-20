let activeEffect = null
// export function getActiveEffect() {
//   return activeEffect
// }
export function effect(fn) {
  activeEffect = fn
  fn()
}

const targetMap = new WeakMap()

// obj = {
//   target:{
//     key:[effect1,effect2]
//   }
// }

export function track(target, type, key) {
  let depsMap = targetMap.get(target)
  // 有无该对象的代理
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  // 有无改对象上属性的代理
  if (!deps) {
    deps = new Set()
  }
  // 每个属性上的的更改都是一个effect
  if (activeEffect) {
    deps.add(activeEffect)
  }
  depsMap.set(key, deps)
}

export function trigger(target, type, key, val) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let deps = depsMap.get(key)
  if (!deps) {
    return
  }
  deps.forEach(effect => effect())
}
