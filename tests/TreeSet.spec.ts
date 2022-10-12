import { test, expect } from 'vitest'
import { TreeSet } from '../src'

/* TreeSet 继承自 BinarySearchTree, 实现 MiSet */

test('TreeSet', async () => {
  const set = new TreeSet((a, b) => a - b, [0, 1, 2, 3, 3, 2, 1])

  expect(set.toString()).toBe('{0,1,2,3}')

  set.add(4)
  set.add(5)
  expect(set.toString()).toBe('{0,1,2,3,4,5}')

  set.add(1)
  expect(set.toString()).toBe('{0,1,2,3,4,5}')
})

test('TreeSet iterator', async () => {
  const set = new TreeSet((a, b) => a - b, [0, 1, 2])

  const ret: number[] = []
  for (const val of set) {
    ret.push(val)
  }
  expect(ret).toEqual([0, 1, 2])

  const ret1: [number, number][] = []
  set.forEach((val1, val2) => ret1.push([val1, val2]))
  expect(ret1).toEqual([[0, 0], [1, 1], [2, 2]])
})

test('TreeSet values', async () => {
  const set = new TreeSet<number>((a, b) => a - b, [4, 5, 2, 1, 6, 7])
  const it = set.values()[Symbol.iterator]()
  expect(it.next()).toEqual({ value: 1, done: false })
  expect(it.next()).toEqual({ value: 2, done: false })
  expect(it.next()).toEqual({ value: 4, done: false })
  expect(it.next()).toEqual({ value: 5, done: false })
  expect(it.next()).toEqual({ value: 6, done: false })
  expect(it.next()).toEqual({ value: 7, done: false })
  expect(it.next()).toEqual({ value: void 0, done: true })

  const ret: number[] = []
  for (const val of set) {
    ret.push(val)
  }
  expect(ret).toEqual([1, 2, 4, 5, 6, 7])
})

test('TreeSet equals', async () => {
  const set1 = new TreeSet((a, b) => a - b, [0, 1, 2])
  const set2 = new TreeSet((a, b) => a - b, [0, 1, 2])
  expect(set1.equals(set2)).toBe(true)
})

test('TreeSet union difference intersect xor', async () => {
  const compare = (a: number, b: number) => a - b
  const set1 = new TreeSet(compare, [0, 1, 2])
  const set2 = new TreeSet(compare, [1, 2, 3])
  set1.union(set2)
  expect([...TreeSet.union(compare, set1, set2)]).toEqual([0, 1, 2, 3])
  expect([...TreeSet.difference(compare, set1, set2)]).toEqual([0])
  // expect([...TreeSet.intersect(compare, set1, set2)]).toEqual([1, 2])
  // expect([...TreeSet.xor(compare, set1, set2)]).toEqual([0, 3])
})

test.skip('TreeSet add delete', async () => {
  const set1 = new TreeSet((a, b) => a - b, [0, 1, 2])
  const set2 = new TreeSet((a, b) => a - b, [1, 2, 3])
  expect([...set1.union(set2).values()]).toEqual([0, 1, 2, 3])
})
