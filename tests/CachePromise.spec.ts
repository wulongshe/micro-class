import { test, expect } from 'vitest'
import { createCachePromise } from '../src'

test('cache Promise', async () => {
  type Data = { key: string; value: number }
  const result: Data[] = []
  const response: Data[] = []

  const sleep = async (time: number) => new Promise((resolve) => setTimeout(resolve, time))

  async function request(key: string, value: number) {
    return new Promise<Data>(async (resolve, reject) => {
      await sleep(100)
      const result = { key, value }
      response.push(result)
      resolve(result)
    })
  }

  const cacheRequest = createCachePromise(request)

  result.push(
    ...(await Promise.all([
      cacheRequest('a', 2),
      cacheRequest('b', 3),
      cacheRequest('a', 2),
      cacheRequest('b', 3),
      cacheRequest('b', 3),
    ])),
  )
  await sleep(200)
  result.push(...(await Promise.all([cacheRequest('b', 3), cacheRequest('a', 2)])))

  expect(result).toEqual([
    { key: 'a', value: 2 },
    { key: 'b', value: 3 },
    { key: 'a', value: 2 },
    { key: 'b', value: 3 },
    { key: 'b', value: 3 },
    { key: 'b', value: 3 },
    { key: 'a', value: 2 },
  ])
  expect(response).toEqual([
    { key: 'a', value: 2 },
    { key: 'b', value: 3 },
    { key: 'b', value: 3 },
    { key: 'a', value: 2 },
  ])

  expect(result[0]).toEqual(result[2])
  expect(result[0]).not.toBe(result[2])
})
