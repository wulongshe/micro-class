import { test, expect } from 'vitest'
import { Heap } from '../src'

test('Heap insert shiftUp', async () => {
  const heap = new Heap<number>((a, b) => b - a)
  heap.insert(3)
  heap.insert(5)
  expect(heap.toString()).toBe('[5,3]')
  heap.insert(2)
  heap.insert(6)
  expect(heap.toString()).toBe('[6,5,2,3]')
})

test('Heap buildHeap', async () => {
  const heap = new Heap<number>((a, b) => b - a)
  heap.buildHeap([3, 5, 2, 6])
  expect(heap.toString()).toBe('[6,5,2,3]')

  expect(new Heap((a, b) => b - a, [3, 5, 2, 6]).toString()).toBe('[6,5,2,3]')
})

test('Heap replace shiftDown', async () => {
  const heap = new Heap<number>((a, b) => b - a, [3, 5, 2, 6])
  heap.replace(1, 1)
  expect(heap.toString()).toBe('[6,3,2,1]')
})

test('Heap peek', async () => {
  const heap = new Heap<number>((a, b) => b - a, [3, 5, 2, 6])
  expect(heap.peek()).toBe(6)
})

test('Heap search', async () => {
  const heap = new Heap<number>((a, b) => b - a, [3, 5, 2, 6])
  expect(heap.search(2)).toBe(2)
})

test('Heap remove', async () => {
  const heap = new Heap<number>((a, b) => b - a, [3, 5, 2, 6])
  expect(heap.remove()).toBe(6)
  expect(heap.remove()).toBe(5)
  expect(heap.remove()).toBe(3)
  expect(heap.remove()).toBe(2)
  expect(heap.remove()).toBe(undefined)
})

test('Heap sort', async () => {
  const arr = [5, 3, 0, 8, 6, 9, 1, 2, 4, 7]
  const ret = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  expect(Heap.sort(arr, (a, b) => a - b)).toEqual(ret)
  expect(arr).toEqual(ret)
})
