export type MiSetMethodNames = 'union' | 'difference' | 'intersect' | 'xor'

export class MiSet<T> extends Set<T> {
  private static createStaticFunc(method: MiSetMethodNames, self = this) {
    return function <T, S extends Set<T>>(first: Set<T>, ...that: S[]) {
      return that.reduce((prev, curr) => prev[method](curr), new self([...first]))
    }
  }
  static union = MiSet.createStaticFunc('union')
  static difference = MiSet.createStaticFunc('difference')
  static intersect = MiSet.createStaticFunc('intersect')
  static xor = MiSet.createStaticFunc('xor')


  equals(that: Set<T>): boolean {
    return (this.constructor as any).equals(this, that)
  }

  static equals<T, S extends Set<T>>(first: S, second: S): boolean {
    for (const val of second) {
      if (!first.has(val)) {
        return false
      }
    }
    for (const val of first) {
      if (!second.has(val)) {
        return false
      }
    }
    return true
  }

  // 并集
  union<S extends Set<T>>(that: S) {
    for (const val of that) {
      this.add(val)
    }
    return this
  }

  // 差集
  difference<S extends Set<T>>(that: S) {
    for (const val of that) {
      this.delete(val)
    }
    return this
  }

  // 交集
  intersect<S extends Set<T>>(that: S) {
    for (const val of this) {
      if (!that.has(val)) {
        this.delete(val)
      }
    }
    return this
  }

  // 异或
  xor<S extends Set<T>>(that: S) {
    for (const val of that) {
      if (this.has(val)) {
        this.delete(val)
      } else {
        this.add(val)
      }
    }
    return this
  }

  toString(): string {
    if (this.size === 0) {
      return '{}'
    }
    let objString = ''
    for (const val of this) {
      objString = `${objString},${val}`
    }
    return `{${objString.slice(1)}}`
  }
}
