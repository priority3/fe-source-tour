import { effect, reactive } from '../src';

import { describe, it, expect, vi } from 'vitest';


describe("响应式测试", () => {
  it('测试一下reactivity和effect', () => {
    let obj = reactive({
      name: 'priority',
      age: 18
    })
    let dummy, myage
    effect(() => {
      dummy = obj.name
      myage = obj.age
    })
    expect(dummy).toBe('priority')
    obj.name = 'priority313'
    expect(dummy).toBe('priority313')
    obj.age = 19
    expect(myage).toBe(19)
  })
  it('测试一下reactivity的分支切换', () => {
    const obj = reactive({
      ok: true,
      name: 'priority',
    })
    let message
    const fn = vi.fn(() => {
      message = obj.ok ? obj.name : 'not name'
    })

    effect(fn)
    // 知道fn调用次数
    expect(fn).toHaveBeenCalledTimes(1)
    expect(message).toBe('priority')

    obj.name = 'this is priority'
    expect(message).toBe('this is priority')
    expect(fn).toHaveBeenCalledTimes(2)

    obj.ok = false
    expect(fn).toHaveBeenCalledTimes(3)
    expect(message).toBe('not name')


    obj.name = 'hahaha'
    expect(message).toBe('not name')
    expect(fn).toHaveBeenCalledTimes(3)

  })
})
