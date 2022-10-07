import { test, expect } from 'vitest'
import { List } from '../src'

test('List slice', async () => {
  const list = new List<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  expect(list).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  expect(list.slice(1, 3)).toEqual([1, 2])

  expect(list['1:3']).toEqual([1, 2])
  expect(list['7:']).toEqual([7, 8, 9])
  expect(list[':2']).toEqual([0, 1])
  expect(list['1:-7']).toEqual([1, 2])
  expect(list[':-7']).toEqual([0, 1, 2])
  expect(list['-9:-6']).toEqual([1, 2, 3])
  expect(list['-3:']).toEqual([7, 8, 9])
  expect(list['1:7:2']).toEqual([1, 3, 5])
  expect(list['1:7:-1']).toEqual([])
  expect(list['-1:-4:-1']).toEqual([9, 8, 7])
  expect(list['-7::-1']).toEqual([3, 2, 1, 0])
  expect(list['::-1']).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
})


test('List insertAt', async () => {
  const list = new List<number>([0, 1])
  list.insertAt(0, 2, 3)
  expect(list).toEqual([2, 3, 0, 1])
})

test('List copyInto', async () => {
  const list = new List<number>([0, 1, 2, 3])
  const arr = []
  list.copyInto(arr)
  expect(arr).toEqual([0, 1, 2, 3])
})

test('List remove', async () => {
  const list = new List<number>([0, 1, 2, 3])
  list.remove(1, 2)
  expect(list).toEqual([0, 3])
})

test('List removeAt', async () => {
  const list = new List<number>([0, 1, 2, 3])
  list.remove(1)
  expect(list).toEqual([0, 2, 3])
})

test('List size', async () => {
  const list = new List<number>([0, 1, 2, 3])
  expect(list.size()).toBe(4)
})

test('List toString', async () => {
  expect(new List([1, 2, 3]).toString()).toBe('[1,2,3]')
  expect(new List().toString()).toBe('[]')
})
