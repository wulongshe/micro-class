import { test, expect } from 'vitest'
import { MiSet } from '../src'

/* MiSet 继承自 Set，Set 自带的方法不再测试 */

test('MiSet toString', async () => {
  const set = new MiSet<number>()
  expect(set.toString()).toBe('{}')
  set.add(1)
  expect(set.toString()).toBe('{1}')
  set.add(2)
  expect(set.toString()).toBe('{1,2}')
})

test('MiSet equals', async () => {
  const set = new MiSet<number>()
  expect(set.equals(new Set([]))).toBe(true)
  set.add(1)
  expect(set.equals(new Set([1]))).toBe(true)
  set.add(2)
  expect(set.equals(new Set([1, 2]))).toBe(true)
})

test('MiSet union', async () => {
  const set1 = new MiSet<number>([1, 2])
  const set2 = new MiSet<number>([2, 3])

  expect(MiSet.equals(MiSet.union(set1, set2, new Set([3, 4])), new Set([1, 2, 3, 4]))).toBe(true)
  set1.union(set2)
  expect(MiSet.equals(set1, new Set([1, 2, 3]))).toBe(true)
})

test('MiSet difference', async () => {
  const set1 = new MiSet<number>([1, 2, 3])
  const set2 = new MiSet<number>([3, 4])

  expect(MiSet.equals(MiSet.difference(set1, set2, new Set([2])), new Set([1]))).toBe(true)
  set1.difference(set2)
  expect(MiSet.equals(set1, new Set([1, 2]))).toBe(true)
})

test('MiSet intersect', async () => {
  const set1 = new MiSet<number>([1, 2, 3])
  const set2 = new MiSet<number>([2, 3, 4])

  expect(MiSet.equals(MiSet.intersect(set1, set2, new Set([3])), new Set([3]))).toBe(true)
  set1.intersect(set2)
  expect(MiSet.equals(set1, new Set([2, 3]))).toBe(true)
})

test('MiSet xor', async () => {
  const set1 = new MiSet<number>([1, 2, 3])
  const set2 = new MiSet<number>([3, 4])

  expect(MiSet.equals(MiSet.xor(set1, set2), new Set([1, 2, 4]))).toBe(true)
  expect(MiSet.equals(MiSet.xor(set1, set2, set1), new Set([3, 4]))).toBe(true)
  set1.xor(set2)
  expect(MiSet.equals(set1, new Set([1, 2, 4]))).toBe(true)
})
