export interface List<T> {
  [key: string]: any
}

export class List<T> extends Array<T> {
  constructor(items: T[] = []) {
    super()
    if (!Array.isArray(items)) return
    this.push(...items)
    return new Proxy(this, {
      get(target, key) {
        if (typeof key !== 'string' || !key.includes(':')) {
          return Reflect.get(target, key)
        }
        return target.slice(...key.split(':').map(
          val => val == void 0 || val === '' ? void 0 : Number(val)
        ))
      }
    })
  }

  slice(start?: number, end?: number, step?: number): List<T> {
    [start, end, step] = this.sliceDefaultValue(start, end, step)
    const list = new List<T>()
    if (step === 0) throw Error('slice step cannot be zero')
    for (let i = 0; step > 0 ? start < end : start > end; start += step) {
      list[i++] = this[start]
    }
    return list
  }
  private sliceDefaultValue(start: number | undefined, end: number | undefined, step = 1) {
    const len = this.length
    const offset = (index: number | undefined, val1: number, val2: number) => {
      return index === void 0
        ? step >= 0 ? val1 : val2
        : Math.max(0, (index + len) % len)
    }
    return [offset(start, 0, len - 1), offset(end, len, -1), step]
  }

  insertAt(index: number, ...item: T[]) {
    this.splice(index, 0, ...item)
  }

  // 将自身复制到指定数组中
  copyInto<V extends Array<T>>(list: V) {
    list.push(...this)
  }

  remove(...items: T[]) {
    items.forEach(val => {
      const index = this.indexOf(val)
      if (index === -1) return false
      this.splice(index, 1)
    })
  }

  removeAt(index: number): T | null {
    return this.slice(index, 1)[0]
  }

  size() {
    return this.length
  }

  toString(): string {
    return `[${this.join(',')}]`
  }
}
