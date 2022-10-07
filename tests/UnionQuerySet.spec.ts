import { test, expect } from 'vitest'
import { UnionQuerySet } from '../src'

test('union query set', async () => {
  const unionQuerySet = new UnionQuerySet<string>()

  // 家庭成员之间的关系
  unionQuerySet.join('Tom', 'John')
  unionQuerySet.join('Miss', 'Jack')
  unionQuerySet.join('Miss', 'Andy')

  // 判断某两个成员是否属于同一家族
  expect(unionQuerySet.jointly('Jack', 'Andy')).toBeTruthy()
  expect(unionQuerySet.jointly('Tom', 'Miss')).toBeFalsy()
})

test('union query set: multiple relationship', async () => {
  const unionQuerySet = new UnionQuerySet<string, number>(
    (prev, curr, pos) => pos ? prev * curr : prev / curr, 1)

  // a == a, b == b, d == d
  unionQuerySet.add('a')
  unionQuerySet.add('b')
  unionQuerySet.add('d')

  // a == 2*b, a == 6*c
  unionQuerySet.join('a', 'b', 2)
  unionQuerySet.join('a', 'c', 6)

  // b == 3*c
  expect(unionQuerySet.find('b')).toEqual({ value: 3, to: 'c' })
  expect(unionQuerySet.jointly('b', 'c')).toEqual({ value: 3, top: 'c' })

  // a 与 d 不存在关系
  expect(unionQuerySet.jointly('a', 'd')).toEqual(null)
})
