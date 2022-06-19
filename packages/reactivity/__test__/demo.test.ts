import {describe,it,expect} from "vitest"
function add(a,b){
  return a+b
}

describe('first',() => {
  it("test add",() => {
    expect(add(2,2)).toBe(4)
  })
})
