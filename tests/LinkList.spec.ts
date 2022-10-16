import { test, expect } from 'vitest'
import { LinkList } from '../src'

test('[LinkList]: constructor, size, clear, isEmpty', async () => {
  const list = new LinkList([1, 2, 3])

  expect(list.size).toBe(3)
  expect(list.isEmpty()).toBe(false)
  list.clear()
  expect(list.isEmpty()).toBe(true)
})

test('[LinkList]: values, iterator, toArray, toString, clone', async () => {
  const arr = [1, 2, 3, 4, 5]
  const list = new LinkList(arr)

  let ret: number[] = []
  for (const ele of list) {
    ret.push(ele)
  }

  expect(ret).toEqual(arr)
  expect(list.toString()).toBe('{1 -> 2 -> 3 -> 4 -> 5}')

  expect(list.clone() === list).toBe(false)
  expect(list.clone()).toEqual(list)
})

test('[LinkList]: insert, insertAll', async () => {
  const list = new LinkList([1])

  list.insert(2, true)
  expect(list.toArray()).toEqual([2, 1])

  list.insertAll([3, 4])
  expect(list.toArray()).toEqual([2, 1, 3, 4])
})

test('[LinkList]: poll, remove, removeAll, removeRange, splice', async () => {
  const list = new LinkList([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])

  expect(list.poll()).toBe(1)

  list.remove(4)
  expect(list.toArray()).toEqual([2, 3, 5, 6, 7, 8, 9, 0])

  list.removeAll([6, 9])
  expect(list.toArray()).toEqual([2, 3, 5, 7, 8, 0])

  list.removeRange(2, 4)
  expect(list.toArray()).toEqual([2, 3, 8, 0])

  expect(list.splice(2, 1, [5, 6, 7]).toArray()).toEqual([8])
  expect(list.toArray()).toEqual([2, 3, 5, 6, 7, 0])
})

test('[LinkList]: slice, contains, containsAll, equals', async () => {
  const list = new LinkList([1, 2, 3, 4, 5])

  expect(list.slice(1, 10).toArray()).toEqual([2, 3, 4, 5])
  expect(list.contains(3)).toBe(true)
  expect(list.containsAll([2, 3])).toBe(true)
  expect(list.containsAll([2, 3, 6])).toBe(false)

  expect(list.equals(new LinkList([1, 2, 3, 4, 5]))).toBe(true)
  expect(list.equals(new LinkList([2, 1, 3, 4, 5]))).toBe(false)
})

test('[LinkList]: indexOf, lastIndexOf, peek, element', async () => {
  const list = new LinkList([1, 2, 3, 2, 5])

  expect(list.indexOf(2)).toBe(1)
  expect(list.lastIndexOf(2)).toBe(-2)

  expect(list.peek()).toBe(1)
  expect(list.peek(true)).toBe(5)

  expect(list.element(2)).toBe(3)
  expect(list.element(-2)).toBe(2)
})
