import { cloneDeep } from 'lodash'
import objectHash from 'object-hash'

export function createCachePromise<T extends any[], R>(generator: (...data: T) => Promise<R>) {
  const cache = new Map<string, Promise<R>>()
  return async function (...data: T): Promise<R> {
    const key = objectHash(data)
    if (cache.has(key)) {
      return new Promise((resolve, reject) => cache.get(key)!.then((res) => resolve(cloneDeep(res)), reject))
    }
    const promise = generator(...data)
    cache.set(key, promise)
    promise.then(() => cache.delete(key))
    return promise
  }
}
