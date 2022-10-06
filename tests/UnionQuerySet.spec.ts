import { test, expect } from 'vitest'
import { UnionQuerySet } from '../src'

test('union query set', async () => {
  const unionQuerySet = new UnionQuerySet<string, number>(
    (prev, curr, pos) => pos ? prev + curr : prev - curr, 0)

  unionQuerySet.add('a')
  unionQuerySet.add('b')

  expect(unionQuerySet.find('a')).toEqual({ value: 0, to: 'a' })

  unionQuerySet.join('a', 'b', 2)

  expect(unionQuerySet.find('a')).toEqual({ value: 2, to: 'b' })
})
