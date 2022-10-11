import { test, expect } from 'vitest'
import { BinarySearchTree } from '../src'

test('BinarySearchTree insert', async () => {
  const tree = new BinarySearchTree<number>((a, b) => a - b)
  let ret: number[] = []
  const createTrace = () => (ret = [], (val: number) => ret.push(val))

  tree.insert(4)
  tree.traverse(createTrace())
  expect(ret).toEqual([4])

  tree.insert(5)
  tree.insert(3)
  tree.traverse(createTrace())
  expect(ret).toEqual([3, 4, 5])

  tree.insert(6)
  tree.insert(2)
  tree.insert(1)
  tree.traverse(createTrace())
  expect(ret).toEqual([1, 2, 3, 4, 5, 6])
})

test('BinarySearchTree construct', async () => {
  const tree = new BinarySearchTree<number>((a, b) => a - b, [5, 3, 3, 1, 4, 7, 5, 4, 4, 5, 6, 8, 9], false)
  let ret: number[] = []
  const createTrace = () => (ret = [], (val: number) => ret.push(val))
  tree.traverse(createTrace())
  expect(ret).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
})

test('BinarySearchTree remove', async () => {
  const tree = new BinarySearchTree<number>((a, b) => a - b, [4, 6, 8, 1, 3, 2, 7, 9, 5])
  let ret: number[] = []
  const createTrace = () => (ret = [], (val: number) => ret.push(val))

  tree.remove(5)
  tree.remove(3)
  tree.remove(9)
  tree.traverse(createTrace())
  expect(ret).toEqual([1, 2, 4, 6, 7, 8])
})

test('BinarySearchTree update', async () => {
  const tree = new BinarySearchTree<number>((a, b) => a - b, [4, 5, 2, 1, 6, 7])
  let ret: number[] = []
  const createTrace = () => (ret = [], (val: number) => ret.push(val))

  tree.update(2, 8)
  tree.traverse(createTrace())
  expect(ret).toEqual([1, 4, 5, 6, 7, 8])

  tree.update(4, 0)
  tree.traverse(createTrace())
  expect(ret).toEqual([0, 1, 5, 6, 7, 8])
})

test('BinarySearchTree search', async () => {
  const tree = new BinarySearchTree<number>((a, b) => a - b, [4, 5, 2, 1, 6, 7])

  expect(tree.search(5)).toBe(3)

  expect(tree.search(8)).toBe(-1)
})

test('BinarySearchTree peek', async () => {
  const tree = new BinarySearchTree<number>((a, b) => a - b, [4, 5, 2, 1, 6, 7])

  expect(tree.peek()).toBe(1)

  expect(tree.peek(-1)).toBe(7)

  expect(tree.peek(2)).toBe(4)
})

test('BinarySearchTree values', async () => {
  const tree = new BinarySearchTree<number>((a, b) => a - b, [4, 5, 2, 1, 6, 7])
  const { [Symbol.iterator]: iterator, next } = tree.values()
  iterator()
  expect(next()).toEqual({ value: 1, done: false })
  expect(next()).toEqual({ value: 2, done: false })
  expect(next()).toEqual({ value: 4, done: false })
  expect(next()).toEqual({ value: 5, done: false })
  expect(next()).toEqual({ value: 6, done: false })
  expect(next()).toEqual({ value: 7, done: false })
  expect(next()).toEqual({ value: void 0, done: true })

  const ret: number[] = []
  for (const val of tree.values()) {
    ret.push(val)
  }
  expect(ret).toEqual([1, 2, 4, 5, 6, 7])
})
