import { test, expect } from 'vitest'
import { Vector } from '../src'

test('Vector add', async () => {
  const v2 = new Vector([1, 2])
  const v3 = new Vector([1, 2, 3])
  expect(v2.add([3, 4]).tuple).toEqual([4, 6])
  expect(v3.add([3, 4, 5]).tuple).toEqual([4, 6, 8])
})

test('Vector sub', async () => {
  const v2 = new Vector([1, 2])
  const v3 = new Vector([1, 2, 3])
  expect(v2.sub([3, 4]).tuple).toEqual([-2, -2 ])
  expect(v3.sub([3, 4, 5]).tuple).toEqual([-2, -2, -2])
})

test('Vector dotProduct', async () => {
  const v2 = new Vector([1, 2])
  const v3 = new Vector([1, 2, 3])
  expect(v2.dotProduct([3, 4])).toBe(11)
  expect(v3.dotProduct([3, 4, 5])).toBe(26)
})

test('Vector crossProduct vertical reverse', async () => {
  const v2 = new Vector([1, 2])
  const v3 = new Vector([1, 2, 3])

  expect(v3.crossProduct([3, 4, 5]).tuple).toEqual([-2, -4, -2])

  expect(v2.vertical(true).tuple).toEqual([-2, 1])
  expect(v3.vertical([3, 4, 5], true).tuple).toEqual([2, 4, 2])
})

test('Vector magnitude unit', async () => {
  const v2 = new Vector([3, 4])
  const v3 = new Vector([3, 4, 5 * Math.sqrt(3)])

  expect(v2.magnitude()).toBe(5)
  expect(v3.magnitude()).toBe(10)

  expect(v2.unit().tuple).toEqual([3/5, 4/5])
  expect(v3.unit().tuple).toEqual([0.3, 0.4, Math.sqrt(3) / 2])
})

test('Vector equals isParallel isVertical', async () => {
  const v2 = new Vector([1, 2])
  const v3 = new Vector([1, 2, 3])

  expect(v2.equals([1, 2])).toBe(true)
  expect(v2.equals([2, 1])).toBe(false)
  expect(v3.equals([1, 2, 3])).toBe(true)

  expect(v2.isParallel([2, 1])).toBe(false)
  expect(v2.isParallel([-1, -2])).toBe(true)

  expect(v3.isParallel([2, 4, 6])).toBe(true)

  expect(v2.isVertical([-2, 1])).toBe(true)
  expect(v3.isVertical([-3, 3, -1])).toBe(true)

  expect(Vector.equals(v2, [2, 1])).toBe(false)
  expect(Vector.equals(v3, [1, 2, 3])).toBe(true)

  expect(Vector.isParallel(v2, [-1, -2])).toBe(true)
  expect(Vector.isParallel(v3, [2, 4, 6])).toBe(true)

  expect(Vector.isVertical(v2, [-2, 1])).toBe(true)
  expect(Vector.isVertical(v3, [-3, 3, -1])).toBe(true)
})
