import { effect, reactive } from '../src';

import { describe, it, expect } from 'vitest';


describe("响应式测试", () => {
  it('测试一下reactivity和effect', () => {
    let obj = reactive({
      name: 'priority'
    })
    let dummy
    effect(() => {
      dummy = obj.name
    })
    expect(dummy).toBe('priority')
    obj.name = 'priority313'
    expect(dummy).toBe('priority313')

  })
})
