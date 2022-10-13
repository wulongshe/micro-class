import { test, expect } from 'vitest'
import { MergeIntervalTree } from '../src'
import type { Interval } from '../src/types'

test('MergeIntervalTree', async () => {
  const tree = new MergeIntervalTree<number>((a, b) => a - b)
  let ret: Interval<number>[] = []
  const createTrace = () => (ret = [], (value: Interval<number>) => ret.push(value))

  tree.join(3, 5)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 5]])

  tree.join(5, 6)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 6]])

  tree.join(8, 11)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 6], [8, 11]])

  tree.join(8, 18)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 6], [8, 18]])

  tree.remove(6, 8)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 6], [8, 18]])

  tree.remove(15, 20)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 6], [8, 15]])

  tree.remove(7, 10)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 6], [10, 15]])

  tree.remove(5, 11)
  tree.traverse(createTrace())
  expect(ret).toEqual([[3, 5], [11, 15]])

  tree.remove(2, 6)
  tree.traverse(createTrace())
  expect(ret).toEqual([[11, 15]])

  tree.join(2, 6)
  tree.traverse(createTrace())
  expect(ret).toEqual([[2, 6], [11, 15]])

  tree.remove(1, 16)
  tree.traverse(createTrace())
  expect(ret).toEqual([])
})

test('MergeIntervalTree', async () => {
  const tree = new MergeIntervalTree<number>((a, b) => a - b)

  expect(tree.toString()).toBe('<>')

  tree.join(3, 5)
  tree.join(5, 7)
  tree.join(9, 15)
  expect(tree.toString()).toBe('<[3,7),[9,15)>')
})
