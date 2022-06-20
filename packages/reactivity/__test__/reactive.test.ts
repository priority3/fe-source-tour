import { effect, reactive } from '../src';

import { describe, it, expect } from 'vitest';


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
})
